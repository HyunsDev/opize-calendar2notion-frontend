export type PaymentLogDto = {
    id: number;
    plan: 'FREE' | 'PRO';
    paymentKind: string;
    price: number;
    priceKind: string;
    paymentTime: string;
    months: string;
    expirationTime: string;
    memo: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
};
