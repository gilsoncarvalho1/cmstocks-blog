import { Link } from "react-router-dom";

export default function Navbar() {
  // Pega o idioma atual ou define 'en' como padrão
  const currentLang = localStorage.getItem("language") || "en";

  const setLanguage = (lang: string) => {
    localStorage.setItem("language", lang);
    window.location.reload(); // Recarrega para atualizar o JSON em todo o site
  };

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'pt', label: 'PT' },
    { code: 'fr', label: 'FR' }
  ];

  return (
    <nav className="border-b border-[#1a1a1a] bg-black/80 backdrop-blur-md sticky top-0 z-50 py-4">
      <div className="max-w-[1100px] mx-auto px-5 flex justify-between items-center">
        {/* Logo Estilo Terminal */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-[38px] h-[38px] bg-[#111] border border-[#333] group-hover:border-[#10b981] rounded flex items-center justify-center font-black text-[10px] text-white transition-colors">
            CMS
          </div>
          <span className="text-sm font-bold tracking-widest uppercase hidden sm:block">
            Insights <span className="text-[#10b981]">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Seletor de Idioma */}
          <div className="flex gap-3 bg-[#0d0d0d] border border-[#1a1a1a] p-1 rounded-lg">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${
                  currentLang === lang.code 
                    ? 'bg-[#10b981] text-black' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Botão de Acesso ao App principal */}
          <a 
            href="https://cmstocks.app" 
            className="bg-white hover:bg-[#10b981] text-black hover:text-white px-4 py-1.5 rounded text-[11px] font-black transition-all uppercase"
          >
            Terminal
          </a>
        </div>
      </div>
    </nav>
  );
}