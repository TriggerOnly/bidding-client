import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const TenderPlatform = () => {
    const features = [
        {
            title: 'Прозрачность процессов',
            description: 'Платформа обеспечивает полную прозрачность тендерных процедур, предоставляя доступ ко всей документации и результатам.',
        },
        {
            title: 'Интуитивный интерфейс',
            description: 'Удобная навигация и интуитивно понятный интерфейс позволяют быстро находить и подавать заявки на участие в тендерах.',
        },
        {
            title: 'Автоматизация процессов',
            description: 'Система автоматически уведомляет участников о статусе тендера, сроках подачи заявок и других важных событиях.',
        },
        {
            title: 'Широкий охват',
            description: 'Платформа охватывает государственные и коммерческие тендеры, обеспечивая участникам доступ к тысячам актуальных закупок.',
        },
        {
            title: 'Поддержка пользователей',
            description: 'Круглосуточная техническая поддержка помогает участникам на каждом этапе — от регистрации до участия в торгах.',
        },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                О нашей тендерной платформе
            </Typography>
            <Typography variant="body1" gutterBottom>
                Добро пожаловать на нашу тендерную платформу — место, где организаторы и участники могут легко и эффективно
                взаимодействовать. Наша миссия — сделать процесс закупок прозрачным, доступным и удобным для всех сторон.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                Основные возможности платформы
            </Typography>
            <Grid container spacing={3}>
                {features.map((feature, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                Почему выбирают нас?
            </Typography>
            <Typography variant="body1">
                Мы предлагаем комплексное решение для всех участников тендеров, включая:
            </Typography>
            <ul>
                <li>Доступ к государственным и коммерческим закупкам.</li>
                <li>Инструменты для подачи заявок и управления участием.</li>
                <li>Обучающие материалы для новичков и профессионалов.</li>
                <li>Актуальные новости и аналитика рынка закупок.</li>
            </ul>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Наша платформа разработана в соответствии с законодательством РФ и современными технологиями, чтобы обеспечить
                максимальную эффективность и безопасность.
            </Typography>
        </Box>
    );
};

export default TenderPlatform;
