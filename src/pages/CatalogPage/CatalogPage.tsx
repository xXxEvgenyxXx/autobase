import {MainLayout, OrderCard} from "@/widgets";
import s from './CatalogPage.module.scss'

export function CatalogPage(){
    return (
        <MainLayout>
            <h1 className={s.title}>Каталог услуг</h1>
            <div className={s.catalogWrapper}>
                <aside className={s.filtersWrapper}>
                    <h2>Фильтры</h2>
                </aside>
                <div className={s.cardsWrapper}>
                    <OrderCard name="Услуга" shortDescription="Краткое описание услуги" />
                </div>
            </div>
        </MainLayout>
    )
}