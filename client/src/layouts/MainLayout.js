import { Outlet } from "react-router-dom";
import { StarsCanvas } from "../components/Stars";

const MainLayout = ({children}) => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center ">
            <StarsCanvas/>
            {children}
            <Outlet />
        </div>
    )
}

export default MainLayout;