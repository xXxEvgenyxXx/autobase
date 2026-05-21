import {Footer} from "@/widgets/Footer";
import {Header} from "@/widgets/Header";
import s from './MainLayout.module.scss'

export interface MainLayoutProps {
    children?: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps){
    return (
        <div className={s.mainLayout}>
            <Header/>
            <main className={s.content}>
                {props.children}
            </main>
            <Footer/>
        </div>
    )
}