import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './MainPage.css';

function MainPage() {
    const tg = WebApp;
    const navigate = useNavigate();

    useEffect(() => {
        const startParam = tg.initDataUnsafe?.start_param ?? "";

        if (startParam) {
            const startData = startParam.split("_");

            switch (startData[0]) {
                case "form":
                    navigate(`/form/${startData[1]}`);
                    break;
                case "ticket":
                    navigate(`/ticket/${startData[1]}`);
                    break;
                case "check":
                    navigate(`/check/${startData[1]}`);
                    break;
                default:
                    break;
            }
        }
    }, [navigate]);

    return (
        <div className="home-container">
          {/* Заголовок */}
          <header className="home-header">
            <h1>Vellem</h1>
            <p>Управляй регистрациями, бронированиями и билетами прямо в Telegram</p>
          </header>

          {/* Быстрые действия */}
          <div className="quick-actions">
            {[
              { title: 'Создать новую форму', desc: 'Запусти регистрацию или бронирование за минуту' },
              { title: 'Мои формы', desc: 'Управляй своими событиями' },
              { title: 'Участники', desc: 'Просматривай и фильтруй заявки' },
              { title: 'Настройки', desc: 'Настрой канал, оплату и доступ' },
            ].map((item, idx) => (
              <div key={idx} className="action-card">
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Шаблоны форм (пример карточек) */}
          <section className="section">
            <h3>Готовые шаблоны форм</h3>
            <div className="template-grid">
              <div className="template-card">
                <h4>Мастер-класс</h4>
                <p>Регистрация на мастер-класс с ограничением по местам и автоматическим напоминанием.</p>
              </div>
              <div className="template-card">
                <h4>Бронирование столика</h4>
                <p>Форма с выбором времени, количества гостей и комментариями.</p>
              </div>
              <div className="template-card">
                <h4>Продажа билетов</h4>
                <p>Поддержка оплаты, e-ticket на почту и QR-код для входа.</p>
              </div>
              <div className="template-card">
                <h4>Консультация</h4>
                <p>Запись на индивидуальные встречи с календарём и подтверждением.</p>
              </div>
            </div>
          </section>

          {/* Стоимость Pro */}
          <section className="section pro-block">
            <h3>Vellem Pro — 990 ₽ / месяц</h3>
            <p>Без ограничений. Подключение оплаты, аналитика и автоматические уведомления.</p>
            <button className="pro-button">Подключить Vellem Pro</button>
          </section>

          {/* Футер */}
          <footer className="home-footer">
            Поддержка — @vellem_support
          </footer>
        </div>
    );
}

export default MainPage;