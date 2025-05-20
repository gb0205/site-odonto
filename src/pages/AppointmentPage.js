import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AppointmentPage = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Função para gerar horários disponíveis com base na data selecionada
  useEffect(() => {
    // Em um site real, isso seria feito com uma chamada à API
    // para verificar horários disponíveis no banco de dados
    
    // Simulando horários disponíveis diferentes para dias diferentes
    const day = date.getDay();
    let times = [];
    
    // Finais de semana (0 = domingo, 6 = sábado)
    if (day === 0) {
      // Domingo (sem horários)
      times = [];
    } else if (day === 6) {
      // Sábado (apenas de manhã)
      times = ['09:00', '10:00', '11:00'];
    } else {
      // Dias de semana
      times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
    }
    
    // Simulando alguns horários já preenchidos
    const randomUnavailable = [];
    for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
      if (times.length > 0) {
        const randomIndex = Math.floor(Math.random() * times.length);
        randomUnavailable.push(times[randomIndex]);
      }
    }
    
    const available = times.filter(t => !randomUnavailable.includes(t));
    setAvailableTimes(available);
    
    // Resetar o horário selecionado se a data mudou
    setTime('');
  }, [date]);

  // Manipuladores de eventos
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  
  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const goToNextStep = () => {
    window.scrollTo(0, 0);
    setFormStep(formStep + 1);
  };
  
  const goToPreviousStep = () => {
    setFormStep(formStep - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulando envio para API
    setTimeout(() => {
      console.log('Dados do agendamento:', {
        ...formData,
        date: date.toLocaleDateString(),
        time
      });
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset do formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setDate(new Date());
      setTime('');
      
      // Retornar ao início após alguns segundos
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormStep(1);
      }, 5000);
    }, 2000);
  };

  // Verificar se o passo atual pode prosseguir
  const canProceed = () => {
    if (formStep === 1) {
      return date && time;
    } else if (formStep === 2) {
      return formData.name && formData.email && formData.phone && formData.service;
    }
    return true;
  };

  // Função para formatar a data para exibição
  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Tela de confirmação após o envio
  if (submitSuccess) {
    return (
      <div className="appointment-page">
        <div className="container">
          <div className="success-message fade-in">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" width="100" height="100">
                <path fill="none" stroke="#00b8d4" strokeWidth="2" d="M1,12 L8,19 L23,5"></path>
              </svg>
            </div>
            <h2>Agendamento Confirmado!</h2>
            <p>Sua consulta foi agendada com sucesso para:</p>
            <div className="appointment-details">
              <p><strong>Data:</strong> {formatDate(date)}</p>
              <p><strong>Horário:</strong> {time}</p>
              <p><strong>Serviço:</strong> {formData.service}</p>
            </div>
            <p>Enviamos os detalhes para o seu email: {formData.email}</p>
            <p className="note">Em caso de dúvidas, entre em contato pelo telefone (11) 3456-7890</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-page">
      <div className="page-header">
        <div className="container">
          <h1>Agende sua Consulta</h1>
        </div>
      </div>
      
      <div className="container">
        <div className="appointment-steps">
          <div className={`step ${formStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-text">Escolha a Data e Hora</div>
          </div>
          <div className="step-connector"></div>
          <div className={`step ${formStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-text">Informações Pessoais</div>
          </div>
          <div className="step-connector"></div>
          <div className={`step ${formStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-text">Confirmação</div>
          </div>
        </div>
        
        <div className="appointment-form-container">
          {formStep === 1 && (
            <div className="date-time-selection fade-in">
              <div className="calendar-container">
                <h3>Selecione uma Data</h3>
                <Calendar 
                  onChange={handleDateChange} 
                  value={date} 
                  minDate={new Date()} 
                  className="interactive-calendar"
                  tileDisabled={({date}) => date.getDay() === 0} // Desabilita domingos
                />
              </div>
              
              <div className="time-slots">
                <h3>Horários Disponíveis</h3>
                {availableTimes.length > 0 ? (
                  <div className="time-grid">
                    {availableTimes.map((timeSlot) => (
                      <button 
                        key={timeSlot} 
                        className={`time-slot ${time === timeSlot ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(timeSlot)}
                      >
                        {timeSlot}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="no-times">Não há horários disponíveis nesta data. Por favor, selecione outra data.</p>
                )}
              </div>
              
              <div className="selected-date-time">
                {date && time && (
                  <div className="selection-summary fade-in">
                    <h4>Sua Seleção</h4>
                    <p><strong>Data:</strong> {formatDate(date)}</p>
                    <p><strong>Horário:</strong> {time}</p>
                  </div>
                )}
              </div>
              
              <div className="form-navigation">
                <button 
                  className="btn next-btn" 
                  onClick={goToNextStep}
                  disabled={!canProceed()}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
          
          {formStep === 2 && (
            <div className="personal-info fade-in">
              <h3>Informações Pessoais</h3>
              <div className="form-group">
                <label htmlFor="name">Nome Completo *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Telefone *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="service">Serviço Desejado *</label>
                <select 
                  id="service" 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione um serviço</option>
                  <option value="Consulta Inicial">Consulta Inicial</option>
                  <option value="Limpeza Dental">Limpeza Dental</option>
                  <option value="Clareamento">Clareamento</option>
                  <option value="Implante">Implante</option>
                  <option value="Tratamento de Canal">Tratamento de Canal</option>
                  <option value="Aparelho Ortodôntico">Aparelho Ortodôntico</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensagem ou Observações</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="form-navigation">
                <button className="btn back-btn" onClick={goToPreviousStep}>
                  Voltar
                </button>
                <button 
                  className="btn next-btn" 
                  onClick={goToNextStep}
                  disabled={!canProceed()}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
          
          {formStep === 3 && (
            <div className="confirmation fade-in">
              <h3>Confirme seus Dados</h3>
              
              <div className="confirmation-details">
                <div className="detail-group">
                  <h4>Data e Horário</h4>
                  <p><strong>Data:</strong> {formatDate(date)}</p>
                  <p><strong>Horário:</strong> {time}</p>
                </div>
                
                <div className="detail-group">
                  <h4>Informações Pessoais</h4>
                  <p><strong>Nome:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Telefone:</strong> {formData.phone}</p>
                </div>
                
                <div className="detail-group">
                  <h4>Detalhes da Consulta</h4>
                  <p><strong>Serviço:</strong> {formData.service}</p>
                  {formData.message && (
                    <p><strong>Observações:</strong> {formData.message}</p>
                  )}
                </div>
              </div>
              
              <div className="terms">
                <p>Ao confirmar o agendamento, você concorda com os nossos <a href="/termos">Termos de Serviço</a> e <a href="/privacidade">Política de Privacidade</a>.</p>
              </div>
              
              <div className="form-navigation">
                <button className="btn back-btn" onClick={goToPreviousStep}>
                  Voltar
                </button>
                <button 
                  className="btn submit-btn" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Confirmar Agendamento'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <section className="appointment-info">
        <div className="container">
          <div className="info-container">
            <div className="info-card fade-in">
              <div className="info-icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <h3>Informações Importantes</h3>
              <ul>
                <li>Chegue 15 minutos antes do horário agendado</li>
                <li>Traga documentos pessoais e cartão do convênio (se tiver)</li>
                <li>Em caso de cancelamento, avise com 24h de antecedência</li>
                <li>Para primeiras consultas, o tempo estimado é de 40 minutos</li>
              </ul>
            </div>
            
            <div className="info-card fade-in">
              <div className="info-icon">
                <i className="fas fa-question-circle"></i>
              </div>
              <h3>Dúvidas Frequentes</h3>
              <div className="faq-item">
                <h4>Quais formas de pagamento são aceitas?</h4>
                <p>Aceitamos dinheiro, cartões de crédito/débito e também oferecemos parcelamento.</p>
              </div>
              <div className="faq-item">
                <h4>O consultório aceita convênios?</h4>
                <p>Sim, trabalhamos com os principais convênios odontológicos. Entre em contato para verificar o seu.</p>
              </div>
              <a href="/faq" className="btn btn-outline">Ver todas as dúvidas</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppointmentPage;