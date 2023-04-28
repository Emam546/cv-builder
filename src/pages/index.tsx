import Head from "next/head";
import BasicInfo, {
    InputData as BasicInputData,
} from "@src/components/basicInfo";
import { useForm } from "react-hook-form";
import Professional, {
    InputData as ProInputData,
} from "@src/components/profesional";
import EmploymentInfo, {
    InputData as EmployInfoData,
} from "@src/components/Employment";
export type Data = BasicInputData | ProInputData | EmployInfoData;
export default function Home() {
    const form = useForm<Data>({
        defaultValues: {
            basicInfoHead: "Personal Details",
            proDataHead: "Profession Details",
            employmentHead: "Employment History",
        },
    });

    return (
        <>
            <Head>
                <title>Make your Resume api</title>
            </Head>
            <div className="px-1">
                <main className="container px-4 mx-auto relative">
                    <BasicInfo {...(form as any)} />
                    <Professional {...(form as any)} />
                    <EmploymentInfo {...(form as any)} />
                </main>
            </div>
        </>
    );
}
