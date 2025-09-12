'use client';

import { INSUREPAL_API } from "@/config";
import { axiosHandler } from "@/hooks/useAxios";
import useClientToken from "@/hooks/useClientToken";
import useClientUser from "@/hooks/useClientUser";
import { INSURANCE_CLASS, INSURANCE_COMPANY, INSURANCE_TYPE, POLICY } from "@/utils/types";
import axios from "axios";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext({
    insuranceCompanies: [] as INSURANCE_COMPANY[],
    allCompanies: [] as INSURANCE_COMPANY[],
    insuranceTypes: [] as INSURANCE_TYPE[],
    insuranceClasses: [] as INSURANCE_CLASS[],
    policies: [] as POLICY[],
    getPolicies: () => {},
});

export const useAppContext = () => {
    const context = useContext(AppContext);

    return context;
}

const AppContextProvider = ({ children }: { children: ReactNode }) => {

    const user = useClientUser();
    const token = useClientToken();

    const [insuranceCompanies, setInsuranceCompanies] = useState<INSURANCE_COMPANY[]>([]);
    const [allCompanies, setAllCompanies] = useState<INSURANCE_COMPANY[]>([]);
    const [insuranceTypes, setInsuranceTypes] = useState<INSURANCE_TYPE[]>([]);
    const [insuranceClasses, setInsuranceClasses] = useState<INSURANCE_CLASS[]>([]);
    const [policies, setPolicies] = useState<POLICY[]>([]);

    const getInsurances = async () => {
        const compRes = await axios.get(`${INSUREPAL_API}/insurance-companies`);
        const allCompaniesRes = await axios.get(`${INSUREPAL_API}/all-companies`);
        const theCompanies = compRes.data.insuranceCompanies;
        setAllCompanies(allCompaniesRes.data.insuranceCompanies);
        const typeRes = await axios.get(`${INSUREPAL_API}/insurance-types`);
        const theTypes = typeRes.data.insuranceTypes;
        const classRes = await axios.get(`${INSUREPAL_API}/insurance-classes`);
        const theClasses = classRes.data.insuranceClasses;
        // const filteredClasses = theClasses.filter(e => e.details.payments.monthlyInstallment !== 0 || e.details.payments.rate !== 0 || e.details.payments.secondInstallment !== 0 || e.details.payments.firstInstallment !== 0 || e.details.payments.restOfPeriodAfterFirstInstallment !== 0 || e.details.payments.restOfPeriodAfterSecondInstallment !== 0 || e.details.payments.annualInstallment !== 0);
        const filteredClasses = theClasses.filter((e: INSURANCE_CLASS) => {
            const values = Object.values(e.details.payments);
            let isValid = false;
            values.forEach(v => {
                if(v > 0) {
                    isValid = true;
                }
            });
            return isValid;
        });
        setInsuranceClasses(filteredClasses);
        const filteredTypes = theTypes.filter((each: INSURANCE_TYPE) => filteredClasses.find((cl: INSURANCE_CLASS) => cl.insuranceType === each._id));
        setInsuranceTypes(filteredTypes);
        const filteredCompanies = theCompanies.filter((each: INSURANCE_COMPANY) => filteredTypes.find((ty: INSURANCE_TYPE) => ty.insuranceCompany === each._id))
        setInsuranceCompanies(filteredCompanies);
    };

    const getPolicies = async () => {
        try {
            const request = axiosHandler(token);
            const response = await request({ method: 'get', path: '/policy' });
            setPolicies(response.data.policies);
        } catch (err) {
            console.log('Policies error:', err);
        }
    }

    useEffect(() => {
        getInsurances();
    }, [])

    useEffect(() => {
        if (user && token) {
            getPolicies();
        }
    }, [user, token])

    const value = useMemo(() => ({
        insuranceCompanies,
        allCompanies,
        insuranceTypes,
        insuranceClasses,
        policies,
        getPolicies,
    }), [
        insuranceCompanies,
        allCompanies,
        insuranceTypes,
        insuranceClasses,
        policies,
        getPolicies,
    ]);

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}

export default AppContextProvider;