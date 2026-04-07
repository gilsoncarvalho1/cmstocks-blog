import { useParams, Link } from "react-router-dom";
import posts from "../data/posts.json";

export default function BlogPost() {
  const { slug } = useParams();
  const currentLang = localStorage.getItem("language") || "en"; 

  const postData = posts.find((p) => p.slug === slug);

  // 1. Trava de Post inexistente
  if (!postData) return <div className="text-white p-20 text-center font-black tracking-tighter">404 // ANALYSIS_NOT_FOUND</div>;

  // 2. TRAVA DE DATA (COLOQUE AQUI)
  const postDate = new Date(postData.date);
  const today = new Date();

  if (postDate > today) {
    return (
      <div className="main-content flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 border border-[#f1c40f] text-[#f1c40f] flex items-center justify-center rounded-full mb-6 animate-pulse text-2xl">
          🔒
        </div>
        <h1 className="text-white font-black text-2xl tracking-tighter mb-2 uppercase">
          {currentLang === 'pt' ? 'Acesso Agendado' : currentLang === 'fr' ? 'Accès Planifié' : 'Scheduled Access'}
        </h1>
        <p className="text-gray-500 font-mono text-xs tracking-widest mb-8">
          RELEASE_DATE: {postData.date} // STATUS: ENCRYPTED
        </p>
        <Link to="/" className="text-[#10b981] font-black text-[10px] uppercase tracking-[0.3em] border border-[#10b981]/30 px-6 py-2 rounded hover:bg-[#10b981] hover:text-black transition-all">
          ← TERMINAL_HOME
        </Link>
      </div>
    );
  }

  // Se passar pelas travas, segue o fluxo normal
  const post = postData.languages[currentLang as keyof typeof postData.languages];

  const ui = {
    back: { en: "Back to Analyses", pt: "Voltar para Análises", fr: "Retour aux Analyses" },
    premiumTitle: { en: "UPGRADE TO PRO", pt: "ASSINE O PREMIUM", fr: "PASSER AU PRO" },
    premiumDesc: { en: "Get real-time liquidity maps and whale alerts.", pt: "Acesse mapas de liquidez e alertas de baleias em tempo real.", fr: "Accédez aux cartes de liquidité et alertes de baleines." },
    premiumBtn: { en: "OPEN TERMINAL", pt: "ABRIR TERMINAL", fr: "OUVRIR LE TERMINAL" }
  };

  const t = (key: keyof typeof ui) => ui[key][currentLang as 'en' | 'pt' | 'fr'] || ui[key]['en'];

  return (
    <div className="main-content max-w-[900px] mx-auto pb-20 px-4">
      
      {/* NAVEGAÇÃO SUPERIOR */}
      <div className="mb-12 pt-6">
        <Link to="/" className="inline-flex items-center gap-3 text-gray-500 hover:text-[#10b981] transition-all group">
          <div className="w-8 h-8 rounded border border-[#1a1a1a] flex items-center justify-center group-hover:border-[#10b981] bg-[#0d0d0d]">
            <span className="text-lg">←</span>
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest">{t('back')}</span>
        </Link>
      </div>

      <article className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 md:p-16">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#10b981] text-black text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-tighter">
                {postData.category}
              </span>
              <span className="text-gray-600 text-xs font-mono">{postData.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tighter">
              {post.title}
            </h1>
          </header>

          {/* CONTEÚDO DO POST */}
          <div 
            className="prose prose-invert prose-emerald max-w-none mb-16
                       prose-p:text-gray-400 prose-p:text-lg prose-p:leading-relaxed
                       prose-headings:text-white prose-headings:font-bold
                       prose-strong:text-[#10b981]"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          {/* ESPAÇAMENTO */}
      <div className="my-12"></div>

      {/* BANNER PREMIUM DESTACADO (ESTILO CMSTOCKS) */}
      <section className="mt-16 bg-linear-to-br from-[#1e1e1e]/90 to-[#0a0a0a]/90 backdrop-blur-md border border-[#f1c40f] rounded-2xl p-8 text-center shadow-[0_0_15px_rgba(241,196,15,0.1)] hover:shadow-[0_0_25px_rgba(241,196,15,0.2)] transition-all">
        <div className="text-2xl mb-2">🏆</div>
        <h3 className="text-[#f1c40f] font-bold uppercase tracking-widest mb-4">CMStocks Premium</h3>
        <ul className="text-left max-w-xs mx-auto mb-6 space-y-2">
          <li className="text-xs text-gray-300 flex items-center gap-2">✅ Real-time Liquidity Maps</li>
          <li className="text-xs text-gray-300 flex items-center gap-2">✅ Whale Wallet Tracking</li>
          <li className="text-xs text-gray-300 flex items-center gap-2">✅ AI Market Predictions</li>
        </ul>
        <a 
          href="https://cmstocks.app" 
          className="block w-full bg-[#f1c40f] hover:bg-white text-black font-bold py-3 rounded-lg transition-all"
        >
          UPGRADE NOW - $5.90
        </a>
      </section>

        </div>

        {/* BARRA DE STATUS INFERIOR */}
        <div className="bg-[#050505] border-t border-[#1a1a1a] px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
                <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">Live Terminal Feed</span>
            </div>
            <span className="text-[10px] text-gray-700 font-mono">CMS_ID: {slug?.toUpperCase()}</span>
        </div>
      </article>
    </div>
  );
}