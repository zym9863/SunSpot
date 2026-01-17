/**
 * 天气服务模块 - 使用 Open-Meteo API
 */

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'stormy';

export interface WeatherData {
    type: WeatherType;
    temperature: number;
    description: string;
    icon: string;
}

// WMO 天气代码映射
const weatherCodeMap: Record<number, WeatherType> = {
    0: 'sunny',      // 晴天
    1: 'sunny',      // 大致晴朗
    2: 'cloudy',     // 部分多云
    3: 'cloudy',     // 阴天
    45: 'cloudy',    // 雾
    48: 'cloudy',    // 雾凇
    51: 'rainy',     // 小毛毛雨
    53: 'rainy',     // 中毛毛雨
    55: 'rainy',     // 大毛毛雨
    61: 'rainy',     // 小雨
    63: 'rainy',     // 中雨
    65: 'rainy',     // 大雨
    66: 'rainy',     // 冻雨
    67: 'rainy',     // 大冻雨
    71: 'cloudy',    // 小雪
    73: 'cloudy',    // 中雪
    75: 'cloudy',    // 大雪
    80: 'rainy',     // 阵雨
    81: 'rainy',     // 中阵雨
    82: 'stormy',    // 大阵雨
    85: 'cloudy',    // 小阵雪
    86: 'cloudy',    // 大阵雪
    95: 'stormy',    // 雷暴
    96: 'stormy',    // 雷暴加冰雹
    99: 'stormy',    // 强雷暴
};

const weatherDescriptions: Record<WeatherType, string> = {
    sunny: '阳光明媚',
    cloudy: '多云转晴',
    rainy: '细雨绵绵',
    stormy: '风雨交加',
};

const weatherIcons: Record<WeatherType, string> = {
    sunny: '☀️',
    cloudy: '⛅',
    rainy: '🌧️',
    stormy: '⛈️',
};

/**
 * 根据经纬度获取天气数据
 */
export async function getWeather(latitude: number, longitude: number): Promise<WeatherData> {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
        );

        if (!response.ok) {
            throw new Error('天气API请求失败');
        }

        const data = await response.json();
        const weatherCode = data.current?.weather_code ?? 0;
        const temperature = data.current?.temperature_2m ?? 20;

        const type = weatherCodeMap[weatherCode] ?? 'sunny';

        return {
            type,
            temperature: Math.round(temperature),
            description: weatherDescriptions[type],
            icon: weatherIcons[type],
        };
    } catch (error) {
        console.error('获取天气数据失败:', error);
        // 返回默认天气
        return {
            type: 'sunny',
            temperature: 22,
            description: '阳光明媚',
            icon: '☀️',
        };
    }
}

/**
 * 根据IP获取位置信息（降级方案）
 */
export async function getLocationByIP(): Promise<{ latitude: number; longitude: number }> {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return {
            latitude: data.latitude ?? 39.9,
            longitude: data.longitude ?? 116.4,
        };
    } catch {
        // 默认北京
        return { latitude: 39.9, longitude: 116.4 };
    }
}

/**
 * 获取天气主题名称
 */
export function getThemeFromWeather(type: WeatherType): string {
    return type === 'sunny' ? 'sunny' : type === 'stormy' || type === 'rainy' ? 'rainy' : 'cloudy';
}
