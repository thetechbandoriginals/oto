export type USER = {
    _id: string;
    name: string;
    email: string;
}

export type INSURANCE_COMPANY = {
    _id: string;
    name: string;
    active: boolean
}

export type INSURANCE_TYPE = {
    _id: string;
    name: string;
    insuranceCompany: string;
}

export type INSURANCE_CLASS = {
    _id: string;
    name: string;
    insuranceType: INSURANCE_TYPE | string;
    insuranceCompany: INSURANCE_COMPANY | string;
    details: {
        monthly: boolean;
        annual: boolean;
        payments: {
            firstInstallment?: number;
            secondInstallment?: number;
            restOfPeriodAfterFirstInstallment?: number;
            restOfPeriodAfterSecondInstallment?: number;
            annualInstallment?: number;
            monthlyInstallment: number;
            extraSeatAmount?: number;
            rate?: number;
        },
        extensions: string[]
    },
    active: boolean
}

export type INSURE_PAL_POLICY = {
    _id: string,
    name: string,
    phone: number,
    email: string,
    idNumber: number,
    kraPin: string,
    address: string,
    regNo: string,
    make: string,
    model: string,
    chasisNo: string,
    engineNo?: string,
    yearOfManufacture: number,
    insuranceClass: INSURANCE_CLASS,
    previousClasses: string[],
    initialDate: Date,
    initialEndDate: Date,
    initialVerification: false,
    tonnage?: Number | null,
    seatCapacity?: Number | null,
    bodyType: string,
    startDate: Date,
    endDate: Date,
    details: {
        seats: string,
        frequency: string,
        value?: number | string
    },
    hasIssued: boolean,
    paid: boolean,
    price: number,
    document?: string,
    documents: string[],
    credit: boolean,
    cancelled: boolean,
    logs: string[],
    policyNumber: string,
    createdAt: Date,
}

export type POLICY = {
    _id: string;
    createdAt: Date;
    policy: INSURE_PAL_POLICY;
    price: number;
    percentageIncrease: number;
}