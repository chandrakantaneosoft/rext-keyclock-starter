// import { BasicButton, Box, TextField } from "@neosoft-technologies/core";
import TextField from '@mui/material/TextField';
import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import Button from '@mui/material/Button';


export default function Login() {
    const { data, status }: any = useSession();
    const [open, setOpen] = useState(true);

    useEffect(() => {
        // if (status == "unauthenticated" || data.error) {
        try {
            // console.log("session gaurd try", status, data);
            // signIn("keycloak");
        } catch (error) {
            // console.log("session error", error);
        }
        // } else {
        // }
    }, [data]);
    // console.log("session gaurd out", status, data);


    return (
        <>
            <p>SIgn in using key click</p>
            <Button variant="outlined" onClick={() => signIn("keycloak")}>Outlined</Button>

        </>
    );

}
