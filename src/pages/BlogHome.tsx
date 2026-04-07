import posts from "../data/posts.json";
import { Link } from "react-router-dom";

export default function BlogHome() {
  const currentLang = localStorage.getItem("language") || "en";
  
  // Obtém a data atual no formato "YYYY-MM-DD" para comparação precisa
  const today = new Date();
  
  const filteredPosts = posts.filter((post) => {
    // Convertemos a data do post (ex: "07 APR 2026") para um objeto Date
    // Dica: Se preferir, mude no JSON para "2026-04-07" para facilitar a precisão
    const postDate = new Date(post.date);
    
    // Retorna apenas posts cuja data seja igual ou anterior a hoje
    return postDate <= today;
  });

  // Ordenar para que o mais recente apareça primeiro
  const sortedPosts = filteredPosts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-10">
      <div className="section-title uppercase">
        {currentLang === 'pt' ? 'Análises de Mercado' : currentLang === 'fr' ? 'Analyses de Marché' : 'Market Analyses'}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedPosts.map((postData) => {
          const post = postData.languages[currentLang as keyof typeof postData.languages];
          
          return (
            <Link key={postData.slug} to={`/post/${postData.slug}`} className="news-card group block bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#10b981] transition-all p-6">
               <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full shadow-[0_0_8px_#10b981]"></span>
                  {postData.date}
               </div>
               <h2 className="text-xl font-bold mb-3 group-hover:text-[#10b981] transition-colors">{post.title}</h2>
               <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
            </Link>
          );
        })}
      </div>
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

      {sortedPosts.length === 0 && (
        <div className="text-center py-20 text-gray-600 font-mono text-sm">
          [ NO NEW DATA DROPS SCHEDULED FOR TODAY ]
        </div>
      )}
    </div>
  );
}