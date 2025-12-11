"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  MapPin, 
  FileText, 
  Bell, 
  ChevronRight, 
  Send, 
  X, 
  TreeDeciduous, 
  CheckCircle2,
  Clock,
  Download,
  Menu,
  Sparkles,
  Phone
} from 'lucide-react';

// --- BRAND COLORS & CONFIG ---
// Dorado Conterra aproximado: #B09261
// Gris oscuro cálido: #2D2A26

// --- MOCK DATA ACTUALIZADA CON PROYECTOS REALES ---
const MOCK_USER = {
  name: "Carlos Rodríguez",
  lote: "Lote 112 - Etapa 1",
  proyecto: "Praderas de Cardales III", // Nombre real del proyecto
  dni: "12345678",
  avance: 72,
  estado: "Al día",
  proxima_cuota: "10 Noviembre, 2025"
};

const TIMELINE_UPDATES = [
  {
    id: 1,
    date: "10 Oct 2025",
    title: "Finalización del SUM y Parrillas",
    desc: "Se ha completado la construcción del SUM y el área de parrillas en el sector deportivo de Praderas de Cardales III.",
    status: "completado",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    date: "25 Sep 2025",
    title: "Tendido Eléctrico Subterráneo",
    desc: "Avanzamos con la etapa 2 del tendido eléctrico en la zona de acceso principal.",
    status: "completado",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    date: "15 Ago 2025",
    title: "Apertura de Calles Internas",
    desc: "Finalizada la consolidación de calles en las manzanas C y D.",
    status: "completado",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400"
  }
];

// --- COMPONENTS ---

const WhatsAppIcon = ({ className = "" }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-stone-100 text-stone-800",
    success: "bg-[#B09261]/20 text-[#8C7040]", 
    warning: "bg-amber-100 text-amber-700",
    outline: "border border-stone-200 text-stone-600"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "primary", onClick, className = "", icon: Icon }) => {
  const base = "inline-flex items-center justify-center rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#B09261] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none tracking-wide";
  const variants = {
    primary: "bg-[#B09261] text-white hover:bg-[#967D50] h-10 px-6 py-2 uppercase text-xs", 
    secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200 h-10 px-4 py-2 uppercase text-xs",
    ghost: "hover:bg-stone-100 text-stone-700 h-10 px-4 uppercase text-xs",
    icon: "h-10 w-10 hover:bg-stone-100 text-stone-700"
  };
  
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </button>
  );
};

// --- VIEWS ---

const LoginView = ({ onLogin }) => {
  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dni) return;
    setLoading(true);
    // Simular delay de red
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col md:flex-row font-serif">
      {/* Left Side: Image */}
      <div className="hidden md:flex md:w-1/2 bg-[#2D2A26] relative overflow-hidden">
        <img 
          src="/image.webp" 
          alt="Conterra Desarrollos" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 sepia-[.2]"
        />
        <div className="relative z-10 p-16 text-white flex flex-col justify-between h-full">
          <div className="flex flex-col items-start space-y-4">
            <div className="h-16 w-16 border-2 border-[#B09261] rounded-full flex items-center justify-center mb-2 bg-[#2D2A26]/80 backdrop-blur-sm">
                <img src="/logo.png" alt="Conterra Logo" className="h-8 w-8 object-contain" />
            </div>
            <span className="text-3xl tracking-[0.2em] font-light text-[#B09261] border-b border-[#B09261] pb-4">CONTERRA</span>
            <span className="text-sm tracking-[0.4em] text-white font-light">DESARROLLOS</span>
          </div>
          <div className="border-l-2 border-[#B09261] pl-6">
            <h2 className="text-3xl font-light mb-4 text-white">Inversiones que crecen.</h2>
            <p className="text-stone-300 text-lg font-light">Gestiona tu lote en Praderas de Cardales, Saint Francis y más.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-sm space-y-10">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-light text-[#2D2A26]">Acceso Clientes</h1>
            <p className="text-[#B09261] mt-2 font-medium">Portal de Propietarios</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="dni" className="text-xs uppercase tracking-wider font-bold text-stone-500">Número de Documento</label>
              <input
                id="dni"
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ej: 30123456"
                className="flex h-12 w-full border-b border-stone-300 bg-transparent px-0 py-2 text-lg placeholder:text-stone-300 focus:outline-none focus:border-[#B09261] focus:ring-0 transition-all font-light"
              />
            </div>
            <Button className="w-full" type="submit">
              {loading ? "Verificando..." : "Ingresar"}
            </Button>
          </form>

          <div className="flex items-center justify-center space-x-2 text-stone-400">
             <Phone className="h-4 w-4" />
             <span className="text-xs uppercase tracking-wide">Soporte al Cliente</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardView = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#F5F5F0] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-4xl font-normal text-[#2D2A26]">Bienvenido, {user.name.split(' ')[0]}</h1>
          <p className="text-stone-500 flex items-center mt-2 uppercase tracking-wide text-xs font-bold">
            <MapPin className="h-4 w-4 mr-1 text-[#B09261]" /> {user.proyecto}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon={FileText}>Documentación</Button>
          <Button variant="primary" icon={Download}>Cupón de Pago</Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Status Card */}
        <Card className="col-span-1 md:col-span-2 p-8 bg-[#2D2A26] text-white border-none relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full border border-white/5 opacity-20"></div>
          <div className="absolute right-10 -bottom-10 w-32 h-32 rounded-full border border-[#B09261]/30 opacity-20"></div>

          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <p className="text-[#B09261] text-xs uppercase tracking-widest font-bold mb-2">Tu Propiedad</p>
              <h2
                className="text-3xl font-bold text-stone-600"
                
              >
                {user.lote}
              </h2>
            </div>
            <div className="px-3 py-1 bg-[#B09261]/20 border border-[#B09261] text-[#B09261] text-xs uppercase tracking-wider rounded-sm">
              {user.estado}
            </div>
          </div>
          
          <div className="space-y-3 mb-8 relative z-10">
            <div className="flex justify-between text-sm uppercase tracking-wide">
              <span className="text-stone-400">Avance de Urbanización</span>
              <span className="text-[#B09261] font-bold">{user.avance}%</span>
            </div>
            <div className="h-2 bg-stone-700 rounded-none overflow-hidden">
              <div 
                className="h-full bg-[#B09261] transition-all duration-1000"
                style={{ width: `${user.avance}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-stone-700/50 relative z-10">
            <div>
              <p className="text-stone-500 text-[10px] uppercase tracking-widest mb-1">Superficie Total</p>
              <p
                className="text-xl font-semibold text-stone-600"
                
              >
                1200 m²
              </p>
            </div>
            <div>
              <p className="text-stone-500 text-[10px] uppercase tracking-widest mb-1">Próximo Vencimiento</p>
              <p
                className="text-xl font-semibold text-stone-600"
                
              >
                {user.proxima_cuota}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions / Mini Map */}
        <Card className="col-span-1 p-0 relative group cursor-pointer border-none shadow-md">
          <div className="absolute inset-0 bg-[#2D2A26]/20 group-hover:bg-[#2D2A26]/0 transition-colors z-10" />
          <img 
            src="https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=400" 
            alt="Map"
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute bottom-6 left-6 z-20">
            <Button variant="primary" className="shadow-lg text-[10px] h-8 px-3">
              Ver Ubicación
            </Button>
          </div>
        </Card>
      </div>

      {/* Timeline Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <h3 className="text-xl font-normal text-[#2D2A26] uppercase tracking-wide">Avances de Obra</h3>
            <span className="text-xs text-stone-500">Actualizado: Hace 2 días</span>
          </div>

          <div className="relative border-l border-stone-300 ml-3 space-y-12 pb-8">
            {TIMELINE_UPDATES.map((update) => (
              <div key={update.id} className="relative pl-10">
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-[#B09261] ring-4 ring-[#F5F5F0]" />
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1 group">
                    <span className="text-xs font-bold text-[#B09261] uppercase tracking-widest block mb-2">
                      {update.date}
                    </span>
                    <h4 className="text-lg font-medium text-[#2D2A26] mb-3 group-hover:text-[#B09261] transition-colors">
                      {update.title}
                    </h4>
                    <p className="text-stone-600 leading-relaxed text-sm font-light">
                      {update.desc}
                    </p>
                  </div>
                  {update.image && (
                    <div className="sm:w-48 flex-shrink-0">
                      <img 
                        src={update.image} 
                        alt="Avance" 
                        className="rounded-sm object-cover h-32 w-full shadow-sm sepia-[.15]"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <Card className="p-8 border-t-4 border-t-[#B09261]">
            <h3 className="font-medium text-[#2D2A26] mb-6 flex items-center uppercase tracking-wide text-sm">
              <FileText className="h-4 w-4 mr-2 text-[#B09261]" />
              Carpeta Digital
            </h3>
            <ul className="space-y-4">
              {['Boleto Compra-Venta', 'Reglamento de Cardales III', 'Plano de Mensura', 'Libre Deuda'].map((doc, i) => (
                <li key={i} className="flex items-center justify-between group cursor-pointer hover:bg-stone-50 p-2 rounded-sm -mx-2 transition-colors border-b border-stone-100 last:border-0 pb-3">
                  <div className="flex items-center text-sm text-stone-600">
                    <span className="text-stone-300 mr-3 font-serif italic text-xs">PDF</span>
                    {doc}
                  </div>
                  <Download className="h-4 w-4 text-[#B09261] opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
              ))}
            </ul>
           </Card>
        </div>
      </div>
    </div>
  );
};

// --- CHATBOT WIDGET ---

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Bienvenido a Conterra Desarrollos. Soy su asistente virtual para Praderas de Cardales III. ¿En qué puedo ayudarlo?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Simulacion de IA
    setTimeout(() => {
      let responseText = "Entiendo. Un asesor de Conterra revisará su consulta.";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('luz') || lowerInput.includes('electr')) {
        responseText = "Para Praderas de Cardales III, el tendido eléctrico subterráneo se encuentra en la etapa 2 (acceso principal) finalizada al 25 de Septiembre.";
      } else if (lowerInput.includes('pagar') || lowerInput.includes('cuota')) {
        responseText = "Su próxima cuota vence el 10 de Noviembre. Recuerde que este barrio no tiene expensas, solo cuota de mantenimiento de lote hasta la posesión.";
      } else if (lowerInput.includes('escritura') || lowerInput.includes('posesion')) {
        responseText = "La posesión estimada para la Etapa 1 es Diciembre 2026. La escrituración se realizará una vez finalizadas las obras de infraestructura al 100%.";
      }

      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[500px] transition-all animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#2D2A26] p-4 flex justify-between items-center text-white border-b-4 border-[#B09261]">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-[#B09261]">
                <TreeDeciduous className="h-4 w-4 text-[#B09261]" />
              </div>
              <div>
                <h3 className="font-medium text-sm tracking-wide text-[#B09261]">Soporte Conterra</h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                  Asistente Virtual
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#F5F5F0]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] px-5 py-4 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#2D2A26] text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white text-stone-700 border border-stone-200 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-stone-200">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-stone-100">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escriba su consulta..."
                className="flex-1 bg-stone-50 border-b border-stone-300 px-2 py-2 text-sm focus:outline-none focus:border-[#B09261] transition-colors placeholder:text-stone-400"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="h-10 w-10 bg-[#B09261] text-white rounded-sm flex items-center justify-center hover:bg-[#967D50] disabled:opacity-50 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all transform hover:scale-105 border-2 border-[#B09261] ${
          isOpen ? 'bg-[#2D2A26] rotate-90' : 'bg-[#2D2A26]'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-[#B09261]" />
        ) : (
          <WhatsAppIcon className="h-7 w-7 text-[#B09261]" />
        )}
      </button>
    </div>
  );
};

// --- MAIN APP ---

const App = () => {
  const [view, setView] = useState('login'); // 'login' | 'dashboard'

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-stone-800 selection:bg-[#B09261] selection:text-white">
      {/* Navigation (Only show on dashboard) */}
      {view === 'dashboard' && (
        <nav className="bg-white border-b border-stone-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <div className="border border-[#B09261] p-1.5 rounded-full mr-3">
                  <img src="/logo.png" alt="Conterra Logo" className="h-10 w-10 object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-light text-xl tracking-[0.15em] text-[#2D2A26] leading-none">CONTERRA</span>
                  <span className="text-[10px] tracking-[0.3em] text-[#B09261] font-bold">DESARROLLOS</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <button className="p-2 text-stone-400 hover:text-[#B09261] transition-colors relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#B09261] rounded-full border border-white"></span>
                </button>
                <div className="h-10 w-10 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center text-stone-600 font-serif font-bold text-sm">
                  CR
                </div>
                <button 
                  onClick={() => setView('login')}
                  className="text-xs uppercase tracking-wider font-bold text-stone-500 hover:text-[#B09261] transition-colors"
                >
                  Salir
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main>
        {view === 'login' ? (
          <LoginView onLogin={() => setView('dashboard')} />
        ) : (
          <DashboardView user={MOCK_USER} />
        )}
      </main>

      {/* Chatbot (Always present if logged in, or hidden if you prefer) */}
      {view === 'dashboard' && <ChatWidget />}
    </div>
  );
};

export default App;