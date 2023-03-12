export type PaymentLogObject = {
    id: number;
    plan: 'FREE' | 'PRO';
    paymentKind: string;
    price: number;
    priceKind: string;
    paymentTime: Date;
    months: string;
    expirationTime: Date;
    memo: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
};
