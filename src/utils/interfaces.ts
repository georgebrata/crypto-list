export interface ICoin {
    id: string;
    name: string;
    imgSrc?: string;
    symbol: string;

    price: number;
    change?: number;
    volumne_total?: number;
    sparkline_data?: number[];
}