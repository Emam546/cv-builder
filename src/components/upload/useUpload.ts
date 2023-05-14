import { useAppSelector } from "@src/store";
import axios from "axios";
import Cookies from "js-cookie";
import { UserData } from "@serv/models/user";
import { useDebounceInitialEffect } from "../../utils/hooks";

export function useUploadData() {
    const data: UserData = useAppSelector((state) => ({
        sections: state.form,
        sectionState: state.state.data,
    }));
    const isSingIn = useAppSelector((state) => state.user.isSingIn);
    useDebounceInitialEffect(
        () => {
            if (!isSingIn) return;
            const source = axios.CancelToken.source();
            const token = Cookies.get("token");
            axios
                .post("/api/v1/user/data", data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cancelToken: source.token,
                })
                .then(() => {
                    console.log("uploaded");
                });
            return () => {};
        },
        +(process.env.NEXT_PUBLIC_UPLOADING_TIME || "3000"),
        [data]
    );
}
