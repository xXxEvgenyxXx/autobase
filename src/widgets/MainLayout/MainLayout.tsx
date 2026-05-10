import {Footer} from "@/widgets/Footer";
import {Header} from "@/widgets/Header";

export interface MainLayoutProps {
    children?: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps){
    return (
        <>
            <Header/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </>
    )
}