import { useState } from "react"
import LoginPage from "./pages/login/login.page"
import UserSelector from "./pages/userSelector/userSelector"
import MainLayout from "./pages/MainLayout/MainLayout";

import { SnackbarProvider, useSnackbar } from 'notistack';

const Root = () => {
    const [loginData, setLoginData] = useState()
    const [page, setIPage] = useState("LoginPage")
    const [parameters,setParameters] = useState({})

    const setPage =  (page,parameters) => {
        setIPage(page)
        setParameters(parameters)
    }

    if (!loginData) return <LoginPage setLoginData={setLoginData} setPage={setPage} />

    switch (page) {
        case "userSelector":
            return <UserSelector loginData={loginData} setLoginData={setLoginData} setPage={setPage} />
        case "mainLayout":
            return <MainLayout loginData={loginData} setLoginData={setLoginData} setPage={setPage} parameters={parameters}  />
        default:
            return <span>404</span>
    }
}

const ComponetWrapper = () => {
    <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
    >
        <Root />
    </SnackbarProvider>
}

export default Root