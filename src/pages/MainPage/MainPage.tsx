// MainPage.tsx
import { MainLayout } from '@/widgets';
import {
    Carousel,
    Typography,
    Row,
    Col,
    Card,
    Button,
    Space,
    Divider,
} from 'antd';
import {
    CarOutlined,
    EnvironmentOutlined,
    TeamOutlined,
    SafetyCertificateOutlined,
    PhoneOutlined,
} from '@ant-design/icons';
import s from './MainPage.module.scss';

const { Title, Paragraph, Text } = Typography;

const carouselItems = [
    {
        title: 'Пассажирские перевозки',
        description: 'Комфортные поездки по городу и между городами',
        icon: <TeamOutlined />,
    },
    {
        title: 'Грузовые перевозки',
        description: 'Надёжная доставка любых грузов',
        icon: <CarOutlined />,
    },
    {
        title: 'География услуг',
        description: 'Работаем по всей стране',
        icon: <EnvironmentOutlined />,
    },
];

const services = [
    {
        title: 'Городские пассажирские перевозки',
        description:
            'Трансфер, корпоративный развоз сотрудников, обслуживание мероприятий. Комфортабельные автобусы и микроавтобусы.',
        icon: <CarOutlined />,
    },
    {
        title: 'Междугородние пассажирские перевозки',
        description:
            'Регулярные рейсы и заказные перевозки в соседние регионы. Безопасность и точное расписание.',
        icon: <EnvironmentOutlined />,
    },
    {
        title: 'Грузоперевозки по городу',
        description:
            'Доставка сборных грузов, офисные переезды, курьерские услуги. Собственный парк малотоннажного транспорта.',
        icon: <CarOutlined />,
    },
    {
        title: 'Междугородние грузоперевозки',
        description:
            'Транспортировка товаров на дальние расстояния. Полная логистическая поддержка и страхование грузов.',
        icon: <EnvironmentOutlined />,
    },
];

const advantages = [
    {
        title: 'Свой автопарк',
        description: 'Более 50 единиц техники от легковых авто до грузовиков',
        icon: <CarOutlined />,
    },
    {
        title: 'Опытные водители',
        description: 'Стаж каждого сотрудника не менее 5 лет',
        icon: <TeamOutlined />,
    },
    {
        title: 'Безопасность',
        description: 'Страхование пассажиров и грузов, регулярный техосмотр',
        icon: <SafetyCertificateOutlined />,
    },
];

export function MainPage() {
    return (
        <MainLayout>
            <div className={s.mainPage}>
                {/* Hero-секция с каруселью */}
                <section className={s.hero}>
                    <Carousel autoplay dotPosition="bottom" effect="fade">
                        {carouselItems.map((item, idx) => (
                            <div key={idx}>
                                <div className={s.carouselSlide}>
                                    <div className={s.slideIcon}>{item.icon}</div>
                                    <Title level={2} className={s.slideTitle}>
                                        {item.title}
                                    </Title>
                                    <Paragraph className={s.slideDesc}>
                                        {item.description}
                                    </Paragraph>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </section>

                <Divider />

                {/* Блок "Наши услуги" */}
                <section className={s.services}>
                    <Title level={3} className={s.sectionTitle}>
                        Наши услуги
                    </Title>
                    <Row gutter={[24, 24]} justify="center">
                        {services.map((service, idx) => (
                            <Col xs={24} sm={12} lg={6} key={idx}>
                                <Card hoverable className={s.serviceCard}>
                                    <div className={s.cardIcon}>{service.icon}</div>
                                    <Title level={4}>{service.title}</Title>
                                    <Paragraph>{service.description}</Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                <Divider />

                {/* Преимущества компании */}
                <section className={s.advantages}>
                    <Title level={3} className={s.sectionTitle}>
                        Почему выбирают нас
                    </Title>
                    <Row gutter={[24, 24]} justify="center">
                        {advantages.map((adv, idx) => (
                            <Col xs={24} sm={8} key={idx}>
                                <Card className={s.advantageCard}>
                                    <div className={s.advIcon}>{adv.icon}</div>
                                    <Title level={5}>{adv.title}</Title>
                                    <Text type="secondary">{adv.description}</Text>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                <Divider />

                {/* Призыв к действию */}
                <section className={s.cta}>
                    <Title level={3}>Готовы к сотрудничеству?</Title>
                    <Paragraph className={s.ctaText}>
                        Свяжитесь с нами для расчёта стоимости или закажите обратный звонок
                    </Paragraph>
                    <Space size="middle" wrap>
                        <Button type="primary" size="large" icon={<PhoneOutlined />}>
                            Позвонить
                        </Button>
                        <Button size="large">Заказать звонок</Button>
                    </Space>
                </section>
            </div>
        </MainLayout>
    );
}