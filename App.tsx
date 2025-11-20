
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Cookie as CookieIcon, 
  Gift, 
  Home, 
  Menu, 
  User as UserIcon, 
  X, 
  ChevronLeft, 
  Send,
  Shuffle,
  Lock,
  Inbox,
  CheckCircle,
  Search,
  Settings,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { BarChart, Bar, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import { CookieVisual } from './components/CookieVisual';
import { AppScreen, Campus, CookieConfig, Letter, User } from './types';

// --- Mock Data Constants ---
const MOCK_USER: User = {
  id: 'user_123',
  name: '김싸피',
  campus: Campus.SEOUL,
  classNum: '20반',
  mmId: 'ssafy.kim',
  isVerified: false,
};

const INITIAL_CONFIG: CookieConfig = {
  skinColor: '#C57A45',
  eyeType: 0,
  mouthType: 0,
  accessory: 0,
  shirtColor: 'transparent'
};

const COOKIE_COLORS = ['#C57A45', '#D69E6B', '#8D6E63', '#F3C892', '#FFCCBC', '#795548', '#5D4037', '#EFEBE9'];
const SHIRT_COLORS = ['transparent', '#D83939', '#176A3A', '#F3C892', '#3B82F6', '#8B5CF6', '#EC4899', '#6366F1'];

// --- Helper Components ---

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "w-full py-3 rounded-xl font-title text-2xl transition-all active:scale-95 shadow-md flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-ginger-700 text-white border-2 border-ginger-900 hover:bg-ginger-900",
    secondary: "bg-xmas-green text-white border-2 border-green-900 hover:bg-green-800",
    outline: "bg-white text-ginger-700 border-2 border-ginger-700 hover:bg-ginger-100",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    className="w-full p-3 rounded-lg border-2 border-ginger-300 bg-white focus:border-ginger-700 focus:outline-none font-sans text-lg placeholder-ginger-300 text-ginger-900 transition-colors"
    {...props}
  />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select 
    className="w-full p-3 rounded-lg border-2 border-ginger-300 bg-white focus:border-ginger-700 focus:outline-none font-sans text-lg text-ginger-900 transition-colors appearance-none"
    style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23C57A45%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto', paddingRight: '1.5em' }}
    {...props}
  />
);

// --- Screen Components ---

const LoginScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-6">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="mb-8"
      >
        <CookieIcon size={64} className="text-ginger-500" />
      </motion.div>
      <h2 className="text-2xl font-title text-gray-600 mb-2">Google 계정 연결 중...</h2>
      <p className="text-gray-400">잠시만 기다려주세요</p>
    </div>
  );
};

const MakerScreen = ({ onBack, onSend, currentUser }: { onBack: () => void, onSend: (letter: Letter) => void, currentUser: User }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cookieConfig, setCookieConfig] = useState<CookieConfig>(INITIAL_CONFIG);
  const [letterContent, setLetterContent] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [toCampus, setToCampus] = useState<string>(Campus.SEOUL);
  const [toClass, setToClass] = useState<string>('20반');
  const [toMMId, setToMMId] = useState('');

  const randomize = () => {
    setCookieConfig({
      skinColor: COOKIE_COLORS[Math.floor(Math.random() * COOKIE_COLORS.length)],
      shirtColor: SHIRT_COLORS[Math.floor(Math.random() * SHIRT_COLORS.length)],
      eyeType: Math.floor(Math.random() * 3),
      mouthType: Math.floor(Math.random() * 3),
      accessory: Math.floor(Math.random() * 4),
    });
  };

  const handleSend = () => {
    const newLetter: Letter = {
      id: Date.now().toString(),
      toName: recipientName,
      toCampus: toCampus as Campus,
      toClass: toClass,
      fromName: currentUser.name,
      content: letterContent,
      isLong: letterContent.length > 50,
      cookieConfig: cookieConfig,
      timestamp: Date.now(),
      isRead: false
    };
    onSend(newLetter);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
        <button onClick={() => step === 1 ? onBack() : setStep((step - 1) as 1 | 2 | 3)}>
          <ChevronLeft />
        </button>
        <span className="font-bold text-lg">
          {step === 1 ? '쿠키 꾸미기' : step === 2 ? '편지 쓰기' : '받는 사람'}
        </span>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        {step === 1 && (
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center bg-ginger-100 relative min-h-[300px]">
               <button 
                  onClick={randomize}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-ginger-700 hover:bg-ginger-200"
                >
                  <Shuffle size={20} />
                </button>
              <CookieVisual config={cookieConfig} size={240} animate />
            </div>
            
            <div className="p-4 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10">
              <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Customization</p>
              <div className="space-y-4">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                   {COOKIE_COLORS.map(color => (
                     <button 
                      key={color} 
                      className={`w-10 h-10 rounded-full border-2 flex-shrink-0 ${cookieConfig.skinColor === color ? 'border-black scale-110' : 'border-transparent'}`}
                      style={{backgroundColor: color}}
                      onClick={() => setCookieConfig({...cookieConfig, skinColor: color})}
                     />
                   ))}
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                   {SHIRT_COLORS.map(color => (
                     <button 
                      key={color} 
                      className={`w-10 h-10 rounded-full border-2 flex-shrink-0 ${cookieConfig.shirtColor === color ? 'border-black scale-110' : 'border-transparent'}`}
                      style={{backgroundColor: color === 'transparent' ? 'white' : color}}
                      onClick={() => setCookieConfig({...cookieConfig, shirtColor: color})}
                     >
                       {color === 'transparent' && <X className="w-6 h-6 mx-auto text-gray-300"/>}
                     </button>
                   ))}
                </div>
                 <div className="grid grid-cols-4 gap-2">
                   {[0,1,2].map(type => (
                     <button key={type} onClick={() => setCookieConfig({...cookieConfig, eyeType: type})} className={`p-2 border rounded-lg ${cookieConfig.eyeType === type ? 'bg-ginger-100 border-ginger-500' : ''}`}>
                       Eyes {type + 1}
                     </button>
                   ))}
                   <button className="p-2 text-xs text-gray-400">More...</button>
                 </div>
                 <div className="grid grid-cols-4 gap-2">
                   {[0,1,2,3].map(type => (
                     <button key={type} onClick={() => setCookieConfig({...cookieConfig, accessory: type})} className={`p-2 border rounded-lg ${cookieConfig.accessory === type ? 'bg-ginger-100 border-ginger-500' : ''}`}>
                       Acc {type}
                     </button>
                   ))}
                 </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <Button onClick={() => setStep(2)}>다음: 편지 쓰기</Button>
            </div>
          </div>
        )}

        {step === 2 && (
           <div className="flex flex-col h-full p-6 bg-ginger-100">
              <div className="flex-1 flex items-center justify-center">
                 <motion.div 
                   initial={{ rotateY: 90 }} animate={{ rotateY: 0 }}
                   className="bg-white w-full max-w-sm aspect-[3/4] rounded-xl shadow-lg p-6 flex flex-col border-2 border-ginger-200"
                 >
                   <h3 className="text-center text-ginger-800 font-title text-2xl mb-4">Dear Friend...</h3>
                   <textarea 
                      className="flex-1 w-full resize-none focus:outline-none text-ginger-900 font-sans text-lg leading-relaxed bg-transparent p-2"
                      placeholder="따뜻한 마음을 적어보세요..."
                      value={letterContent}
                      onChange={(e) => setLetterContent(e.target.value)}
                      maxLength={300}
                   />
                   <div className="text-right text-xs text-gray-400 mt-2">
                     {letterContent.length}/300
                   </div>
                 </motion.div>
              </div>
              <div className="mt-4">
                 <Button onClick={() => setStep(3)} disabled={!letterContent.trim()} className={!letterContent.trim() ? "opacity-50" : ""}>
                   다음: 받는 사람
                 </Button>
              </div>
           </div>
        )}

        {step === 3 && (
          <div className="flex flex-col h-full p-6 bg-white">
            <div className="flex-1 space-y-6 pt-4">
               <h3 className="text-xl font-title text-ginger-900">보낼 사람 정보 입력</h3>
               
               <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-ginger-700 mb-1">캠퍼스</label>
                    <Select value={toCampus} onChange={(e) => setToCampus(e.target.value)}>
                      {Object.values(Campus).map(c => <option key={c} value={c}>{c}</option>)}
                    </Select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-ginger-700 mb-1">반</label>
                    <Select value={toClass} onChange={(e) => setToClass(e.target.value)}>
                      {[...Array(20)].map((_, i) => (
                        <option key={i} value={`${i+1}반`}>{i+1}반</option>
                      ))}
                    </Select>
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-ginger-700 mb-1">이름 (직접 입력)</label>
                   <Input 
                    placeholder="이름을 입력하세요 (예: 김싸피)" 
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-ginger-700 mb-1">메타모스트 ID (동명이인 구분용, 선택)</label>
                   <Input 
                    placeholder="선택사항 (예: ssafy.kim)" 
                    value={toMMId}
                    onChange={(e) => setToMMId(e.target.value)}
                   />
                 </div>
               </div>

               <div className="bg-ginger-50 p-4 rounded-xl mt-4">
                 <h4 className="font-bold text-ginger-800 mb-2 text-sm flex items-center gap-2"><Lock size={14}/> 전송 전 확인!</h4>
                 <ul className="text-sm text-ginger-600 space-y-1 list-disc pl-4">
                   <li>크리스마스 전까지 익명으로 유지됩니다.</li>
                   <li>욕설이나 비방은 절대 금지! 🙅‍♂️</li>
                   <li>한 번 구운 쿠키는 되돌릴 수 없어요.</li>
                 </ul>
               </div>
            </div>
            <div className="mt-4 pb-6">
               <Button onClick={handleSend} disabled={!recipientName} className={!recipientName ? "opacity-50" : ""}>
                 🍪 {recipientName || '친구'} 오븐에 넣기
               </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MyOvenScreen = ({ myOven, isChristmas, onBack }: { myOven: Letter[], isChristmas: boolean, onBack: () => void }) => {
  const [selectedCookie, setSelectedCookie] = useState<Letter | null>(null);

  const handleCookieClick = (cookie: Letter) => {
    if (!isChristmas) {
      const messages = [
        "아직 덜 구워졌어요! ⏲️",
        "크리스마스를 기다려주세요 🎄",
        "맛있는 냄새가 솔솔 나네요 🍪",
        "누군가의 따뜻한 마음이 담겨있어요 ❤️"
      ];
      alert(messages[Math.floor(Math.random() * messages.length)]);
    } else {
      setSelectedCookie(cookie);
    }
  };

  // Simple Stats for Oven
  const data = [
    { name: '12/20', count: 2 },
    { name: '12/21', count: 5 },
    { name: '12/22', count: 3 },
    { name: '12/23', count: 8 },
    { name: '12/24', count: 4 },
  ];

  return (
    <div className="min-h-screen bg-[#5D4037] text-white p-6 pb-24">
      <header className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="bg-white/20 p-2 rounded-full"><ChevronLeft/></button>
        <h2 className="text-3xl font-title">내 오븐</h2>
        <div className="w-10"/>
      </header>

      {/* Oven Activity Chart */}
      <div className="mb-8 bg-black/20 p-4 rounded-xl">
        <h3 className="text-sm font-bold mb-4 opacity-80">🔥 Oven Heat Level</h3>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
               <Tooltip 
                  contentStyle={{backgroundColor: '#8B4F24', border: 'none', borderRadius: '8px', color: 'white'}}
                  itemStyle={{color: '#F3C892'}}
                  cursor={{fill: 'rgba(255,255,255,0.1)'}}
               />
               <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#C57A45' : '#D69E6B'} />
                  ))}
               </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {myOven.length === 0 ? (
        <div className="text-center py-20 opacity-60">
          <p>아직 오븐이 비어있어요.</p>
          <p className="text-sm mt-2">친구들에게 링크를 공유해보세요!</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {myOven.map((letter) => (
            <motion.button
              key={letter.id}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              onClick={() => handleCookieClick(letter)}
              className="relative aspect-square bg-white/10 rounded-xl flex flex-col items-center justify-center border border-white/20"
            >
              <div className="scale-50 transform -mb-4">
                 <CookieVisual config={letter.cookieConfig} size={100} />
              </div>
              {!isChristmas && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
                  <Lock className="text-white/80" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Reveal Modal */}
      <AnimatePresence>
        {selectedCookie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
              className="bg-white text-ginger-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="bg-ginger-500 p-4 flex justify-between items-center text-white">
                <span className="font-title text-xl">From. {selectedCookie.fromName}</span>
                <button onClick={() => setSelectedCookie(null)}><X/></button>
              </div>
              <div className="p-8 flex flex-col items-center bg-ginger-50">
                <CookieVisual config={selectedCookie.cookieConfig} size={150} />
                <div className="bg-white p-6 rounded-xl shadow-sm w-full mt-6 border border-ginger-200 min-h-[150px]">
                  <p className="font-sans text-lg leading-relaxed whitespace-pre-wrap">
                    {selectedCookie.content}
                  </p>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  {new Date(selectedCookie.timestamp).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FriendOvenScreen = ({ onBack }: { onBack: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleSearch = () => {
    if(!searchTerm) return;
    setSearchResult({
      name: searchTerm,
      class: '20반',
      cookies: [
         { ...INITIAL_CONFIG, skinColor: COOKIE_COLORS[0] },
         { ...INITIAL_CONFIG, skinColor: COOKIE_COLORS[2], accessory: 1 },
         { ...INITIAL_CONFIG, skinColor: COOKIE_COLORS[4], accessory: 3 },
      ]
    });
  };

  return (
    <div className="min-h-screen bg-ginger-100 p-6 pb-24">
      <header className="flex items-center justify-between mb-6">
        <button onClick={onBack}><ChevronLeft className="text-ginger-900"/></button>
        <h2 className="text-2xl font-title text-ginger-900">친구 오븐</h2>
        <div className="w-6"/>
      </header>

      <div className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input 
            placeholder="이름 검색..." 
            className="pl-10 py-2" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button onClick={handleSearch} className="bg-ginger-700 text-white px-4 rounded-lg font-bold">
          검색
        </button>
      </div>

      {searchResult ? (
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-ginger-200">
           <div className="text-center mb-6">
             <h3 className="text-xl font-bold text-ginger-900">{searchResult.name}님의 오븐</h3>
             <p className="text-gray-500 text-sm">서울 {searchResult.class}</p>
           </div>
           
           <div className="grid grid-cols-3 gap-3">
              {searchResult.cookies.map((config: CookieConfig, idx: number) => (
                <div key={idx} className="aspect-square bg-ginger-50 rounded-xl flex items-center justify-center relative overflow-hidden border border-ginger-100">
                  <div className="scale-50 transform -mb-4">
                    <CookieVisual config={config} size={100} />
                  </div>
                  {idx === 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-xmas-red rounded-full"></span>
                  )}
                </div>
              ))}
           </div>
           <div className="mt-4 text-center text-xs text-gray-400">
             * 친구의 오븐은 외형만 구경할 수 있어요
           </div>
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <Search size={48} className="mx-auto mb-4 opacity-20" />
          <p>친구의 이름을 검색해서<br/>오븐을 구경해보세요!</p>
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('LANDING');
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Data State
  const [myOven, setMyOven] = useState<Letter[]>([]);
  const [sentCookies, setSentCookies] = useState<Letter[]>([]);
  
  // Dev Mode: Toggle Christmas Date
  const [isChristmas, setIsChristmas] = useState(false);

  const goBack = () => {
    if (['MAKER', 'MY_OVEN', 'SENT_COOKIES', 'FRIEND_OVEN', 'MY_PAGE'].includes(screen)) {
      setScreen('HOME');
    } else {
      setScreen('LANDING');
    }
  };

  const handleSendCookie = (newLetter: Letter) => {
    setSentCookies([...sentCookies, newLetter]);
    setMyOven([...myOven, newLetter]);
    alert("쿠키가 오븐에 들어갔어요! 🍪");
    setScreen('HOME');
  };

  const renderLanding = () => (
    <div className="flex flex-col h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-ginger-500 opacity-10 pattern-dots"></div>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
          className="bg-white/80 p-8 rounded-full shadow-xl border-4 border-ginger-500 backdrop-blur-sm"
        >
          <CookieVisual config={{...INITIAL_CONFIG, accessory: 1}} size={180} animate />
        </motion.div>
        
        <div>
          <h1 className="text-6xl font-title text-ginger-900 drop-shadow-sm mb-2">Cookismas</h1>
          <p className="text-xl text-ginger-700 font-sans font-bold">
            SSAFY 비밀 쿠키 오븐 프로젝트 🍪
          </p>
        </div>

        <div className="bg-white/90 p-6 rounded-2xl shadow-lg max-w-xs w-full border-2 border-ginger-300">
          <p className="mb-6 text-gray-600 leading-relaxed">
            크리스마스까지 서로에게<br/>
            따뜻한 마음을 구워주세요.
          </p>
          <Button onClick={() => setScreen('LOGIN')}>
            Google로 시작하기
          </Button>
        </div>
      </div>
      <div className="absolute top-4 right-4 bg-xmas-green text-white px-4 py-2 rounded-full font-title text-xl shadow-lg rotate-3">
        D-{isChristmas ? 'Day' : '12'}
      </div>
    </div>
  );

  const renderAuthInfo = () => (
    <div className="h-screen bg-ginger-100 p-6 flex flex-col">
      <header className="flex items-center py-4">
        <button onClick={() => setScreen('LANDING')}><ChevronLeft className="text-ginger-900" /></button>
        <span className="ml-4 text-2xl font-title text-ginger-900">SSAFY 인증</span>
      </header>
      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 border-2 border-ginger-200">
          <div>
            <label className="block text-sm font-bold text-ginger-700 mb-1">캠퍼스</label>
            <Select>
              {Object.values(Campus).map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-bold text-ginger-700 mb-1">반</label>
            <Select>
              <option>20반</option>
              <option>1반</option>
              <option>2반</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-bold text-ginger-700 mb-1">Mattermost ID</label>
            <Input placeholder="예: ssafy.kim" />
          </div>
        </div>
        <Button onClick={() => setScreen('AUTH_CODE')}>인증 코드 보내기</Button>
      </div>
    </div>
  );

  const renderAuthCode = () => (
    <div className="h-screen bg-ginger-100 p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center space-y-8">
        <div className="bg-white p-8 rounded-full shadow-lg">
          <Inbox size={48} className="text-ginger-500" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-title text-ginger-900 mb-2">DM을 확인해주세요!</h2>
          <p className="text-ginger-700">
            Mattermost DM으로 전송된<br/>4자리 코드를 입력해주세요.
          </p>
        </div>
        <div className="w-full max-w-xs">
          <Input placeholder="0000" className="text-center text-3xl tracking-widest" maxLength={4} />
        </div>
        <Button onClick={() => {
          setCurrentUser({...currentUser, isVerified: true});
          setScreen('AUTH_SUCCESS');
        }}>인증하기</Button>
      </div>
    </div>
  );

  const renderAuthSuccess = () => (
    <div className="h-screen bg-ginger-100 flex flex-col items-center justify-center p-6 text-center">
       <motion.div 
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        className="bg-xmas-green text-white p-6 rounded-full mb-6 shadow-xl"
      >
        <CheckCircle size={64} />
      </motion.div>
      <h2 className="text-4xl font-title text-ginger-900 mb-4">인증 완료!</h2>
      <p className="text-ginger-700 text-lg mb-8">
        이제 친구들의 오븐에<br/>쿠키를 선물하러 가볼까요?
      </p>
      <div className="w-full space-y-3">
        <Button onClick={() => setScreen('MAKER')}>쿠키 만들기</Button>
        <Button variant="outline" onClick={() => setScreen('HOME')}>홈으로 가기</Button>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="min-h-screen bg-ginger-100 pb-24 relative">
      {/* Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed top-0 right-0 w-3/4 h-full bg-white z-50 shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-title text-2xl text-ginger-900">Menu</span>
                <button onClick={() => setIsMenuOpen(false)}><X className="text-ginger-700" /></button>
              </div>
              <div className="space-y-4 flex-1">
                <button onClick={() => { setScreen('MY_PAGE'); setIsMenuOpen(false); }} className="flex items-center gap-3 text-lg text-ginger-900 w-full p-2 hover:bg-ginger-50 rounded-lg">
                  <UserIcon size={24} /> 마이페이지
                </button>
                <button className="flex items-center gap-3 text-lg text-ginger-900 w-full p-2 hover:bg-ginger-50 rounded-lg">
                  <HelpCircle size={24} /> 문의하기
                </button>
                <div className="h-px bg-gray-100 my-4" />
                <button onClick={() => { setScreen('LANDING'); setIsMenuOpen(false); }} className="flex items-center gap-3 text-lg text-gray-400 w-full p-2 hover:bg-gray-50 rounded-lg">
                  <LogOut size={24} /> 로그아웃
                </button>
              </div>
              <div className="text-center text-xs text-gray-300">
                Version 1.0.0 | Cookismas
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white px-6 py-4 sticky top-0 z-20 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-ginger-200 p-2 rounded-full">
            <UserIcon size={20} className="text-ginger-700" />
          </div>
          <span className="font-bold text-ginger-900">{currentUser.classNum} {currentUser.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-xmas-red px-3 py-1 rounded-full text-white font-title text-lg shadow-sm">
            D-{isChristmas ? 'Day' : '12'}
          </div>
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu className="text-ginger-900" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="p-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="bg-ginger-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden mb-8"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-title mb-2">Merry Cookismas!</h2>
            <p className="font-sans opacity-90 text-lg">
              친구들에게 따뜻한 마음을 전하세요.<br/>
              크리스마스에 오븐이 열립니다.
            </p>
            {/* Debug Toggle */}
            <button 
              onClick={() => setIsChristmas(!isChristmas)} 
              className="mt-4 text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30"
            >
              {isChristmas ? 'Debug: Reset' : 'Debug: Simulate Xmas'}
            </button>
          </div>
          <CookieIcon className="absolute -bottom-4 -right-4 text-ginger-700 opacity-30 w-32 h-32" />
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setScreen('MAKER')} className="bg-white p-5 rounded-2xl shadow-sm border-2 border-ginger-100 flex flex-col items-center gap-3 hover:border-ginger-300 transition-colors hover:shadow-md">
            <div className="bg-ginger-100 p-3 rounded-full">
              <CookieIcon className="text-ginger-700" />
            </div>
            <span className="font-bold text-ginger-800">쿠키 굽기</span>
          </button>

          <button onClick={() => setScreen('MY_OVEN')} className="bg-white p-5 rounded-2xl shadow-sm border-2 border-ginger-100 flex flex-col items-center gap-3 hover:border-ginger-300 transition-colors hover:shadow-md">
            <div className="bg-ginger-100 p-3 rounded-full relative">
              <Gift className="text-ginger-700" />
              {myOven.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-xmas-red text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {myOven.length}
                </span>
              )}
            </div>
            <span className="font-bold text-ginger-800">내 오븐</span>
          </button>

          <button onClick={() => setScreen('SENT_COOKIES')} className="bg-white p-5 rounded-2xl shadow-sm border-2 border-ginger-100 flex flex-col items-center gap-3 hover:border-ginger-300 transition-colors hover:shadow-md">
            <div className="bg-ginger-100 p-3 rounded-full">
              <Send className="text-ginger-700" />
            </div>
            <span className="font-bold text-ginger-800">보낸 쿠키</span>
          </button>
          
           <button onClick={() => setScreen('FRIEND_OVEN')} className="bg-white p-5 rounded-2xl shadow-sm border-2 border-ginger-100 flex flex-col items-center gap-3 hover:border-ginger-300 transition-colors hover:shadow-md">
            <div className="bg-ginger-100 p-3 rounded-full">
              <Search className="text-ginger-700" />
            </div>
            <span className="font-bold text-ginger-800">친구 오븐 구경</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSentCookies = () => (
    <div className="min-h-screen bg-ginger-100 p-6 pb-24">
      <header className="flex items-center justify-between mb-6">
        <button onClick={goBack}><ChevronLeft className="text-ginger-900"/></button>
        <h2 className="text-2xl font-title text-ginger-900">보낸 쿠키</h2>
        <div className="w-6"/>
      </header>
      
      <div className="space-y-3">
        {sentCookies.map(letter => (
          <div key={letter.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 bg-ginger-50 rounded-lg flex items-center justify-center overflow-hidden border border-ginger-100">
               <div className="scale-[0.4]">
                  <CookieVisual config={letter.cookieConfig} size={100} />
               </div>
            </div>
            <div>
              <p className="font-bold text-ginger-900">To. {letter.toName} <span className="text-xs font-normal text-gray-400">({letter.toCampus})</span></p>
              <p className="text-sm text-gray-500 truncate max-w-[180px]">{letter.content}</p>
              <p className="text-xs text-gray-300 mt-1">{new Date(letter.timestamp).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
        {sentCookies.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            보낸 쿠키가 없습니다.
          </div>
        )}
      </div>
    </div>
  );

  const renderMyPage = () => (
    <div className="min-h-screen bg-ginger-50 p-6 pb-24">
      <header className="flex items-center justify-between mb-6">
        <button onClick={goBack}><ChevronLeft className="text-ginger-900"/></button>
        <h2 className="text-2xl font-title text-ginger-900">마이페이지</h2>
        <div className="w-6"/>
      </header>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 flex items-center gap-4 border border-ginger-100">
        <div className="w-16 h-16 bg-ginger-200 rounded-full flex items-center justify-center text-2xl">
          🍪
        </div>
        <div>
          <h3 className="font-bold text-lg text-ginger-900">{currentUser.name}</h3>
          <p className="text-gray-500 text-sm">{currentUser.campus} {currentUser.classNum}</p>
          <p className="text-xs text-gray-400 mt-1">{currentUser.mmId}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3 text-ginger-800">
            <Settings size={20}/>
            <span>오븐 공개 설정</span>
          </div>
          <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 checked:right-1 checked:left-auto transition-all"/>
            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-ginger-300 cursor-pointer"></label>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3 text-ginger-800">
            <HelpCircle size={20}/>
            <span>자주 묻는 질문</span>
          </div>
          <ArrowRight size={16} className="text-gray-400"/>
        </div>
         <button onClick={() => setScreen('LANDING')} className="w-full bg-white p-4 rounded-xl flex justify-between items-center shadow-sm text-red-500 mt-8">
          <div className="flex items-center gap-3">
            <LogOut size={20}/>
            <span>로그아웃</span>
          </div>
        </button>
      </div>
      <div className="mt-10 text-center">
         <p className="text-xs text-gray-400">SSAFY Cookismas Project</p>
         <p className="text-[10px] text-gray-300 mt-1">Made with 🧡 by 14th SSAFY</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative font-sans overflow-hidden">
      {screen === 'LANDING' && renderLanding()}
      
      {screen === 'LOGIN' && <LoginScreen onComplete={() => setScreen('AUTH_INFO')} />}
      
      {screen === 'AUTH_INFO' && renderAuthInfo()}
      {screen === 'AUTH_CODE' && renderAuthCode()}
      {screen === 'AUTH_SUCCESS' && renderAuthSuccess()}
      
      {screen === 'HOME' && renderHome()}
      
      {screen === 'MAKER' && (
        <MakerScreen 
          onBack={() => setScreen('HOME')} 
          onSend={handleSendCookie} 
          currentUser={currentUser}
        />
      )}
      
      {screen === 'MY_OVEN' && (
        <MyOvenScreen 
          myOven={myOven} 
          isChristmas={isChristmas} 
          onBack={goBack} 
        />
      )}

      {screen === 'FRIEND_OVEN' && (
        <FriendOvenScreen 
          onBack={goBack} 
        />
      )}
      
      {screen === 'SENT_COOKIES' && renderSentCookies()}
      {screen === 'MY_PAGE' && renderMyPage()}

      {/* Global Bottom Nav for main screens */}
      {['HOME', 'MY_OVEN', 'SENT_COOKIES', 'FRIEND_OVEN'].includes(screen) && (
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-ginger-200 flex justify-around py-3 z-30 pb-6">
          <button onClick={() => setScreen('HOME')} className={`flex flex-col items-center ${screen === 'HOME' ? 'text-ginger-700' : 'text-gray-400'}`}>
            <Home size={24} />
            <span className="text-xs mt-1">홈</span>
          </button>
          <button onClick={() => setScreen('MAKER')} className="flex flex-col items-center text-gray-400 relative">
            <div className="bg-ginger-500 p-3 rounded-full -mt-8 border-4 border-white shadow-lg text-white hover:bg-ginger-600 transition-colors">
              <CookieIcon size={28} />
            </div>
          </button>
          <button onClick={() => setScreen('MY_OVEN')} className={`flex flex-col items-center ${screen === 'MY_OVEN' ? 'text-ginger-700' : 'text-gray-400'}`}>
            <Gift size={24} />
            <span className="text-xs mt-1">오븐</span>
          </button>
        </nav>
      )}
    </div>
  );
}
