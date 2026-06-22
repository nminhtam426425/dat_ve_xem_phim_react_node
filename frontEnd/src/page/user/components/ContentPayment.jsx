const ContentPayment = () => {
    return <main class="bg-background2 text-on-background2 font-body-md min-h-screen flex flex-col">
        <div class="flex-grow max-w-[1280px] mx-auto w-full px-4 md:px-12 py-12">
            <div class="flex items-center justify-center mb-12 space-x-4">
            <div class="flex items-center text-zinc-500">
            <span class="w-8 h-8 rounded-full border border-zinc-500 flex items-center justify-center text-xs mr-2">01</span>
            <span class="text-sm font-label-bold">SEATS</span>
            </div>
            <div class="w-12 h-px bg-zinc-800"></div>
            <div class="flex items-center text-primary-container">
            <span class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-xs mr-2 text-white">02</span>
            <span class="text-sm font-label-bold">PAYMENT</span>
            </div>
            <div class="w-12 h-px bg-zinc-800"></div>
            <div class="flex items-center text-zinc-500">
            <span class="w-8 h-8 rounded-full border border-zinc-500 flex items-center justify-center text-xs mr-2">03</span>
            <span class="text-sm font-label-bold">TICKET</span>
            </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <div class="lg:col-span-7 space-y-8">
            <section>
            <h2 class="font-headline-md text-white mb-6">Payment Method</h2>
            <div class="space-y-4">

            <div class="glass-panel p-6 rounded-xl flex items-center justify-between cursor-pointer border-primary-container bg-primary-container/5">
            <div class="flex items-center space-x-4">
            <span class="material-symbols-outlined text-primary-container">credit_card</span>
            <div>
            <p class="font-label-bold text-white uppercase">Credit / Debit Card</p>
            <p class="text-xs text-zinc-400">Visa, Mastercard, JCB</p>
            </div>
            </div>
            <div class="w-5 h-5 rounded-full border-2 border-primary-container flex items-center justify-center">
            <div class="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
            </div>
            </div>

            <div class="glass-panel p-6 rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors">
            <div class="flex items-center space-x-4">
            <span class="material-symbols-outlined text-zinc-400">account_balance_wallet</span>
            <div>
            <p class="font-label-bold text-zinc-200 uppercase">E-Wallet</p>
            <p class="text-xs text-zinc-400">MoMo, ZaloPay, ShopeePay</p>
            </div>
            </div>
            <div class="w-5 h-5 rounded-full border-2 border-zinc-700"></div>
            </div>

            <div class="glass-panel p-6 rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors">
            <div class="flex items-center space-x-4">
            <span class="material-symbols-outlined text-zinc-400">account_balance</span>
            <div>
            <p class="font-label-bold text-zinc-200 uppercase">Bank Transfer</p>
            <p class="text-xs text-zinc-400">QR Pay, Internet Banking</p>
            </div>
            </div>
            <div class="w-5 h-5 rounded-full border-2 border-zinc-700"></div>
            </div>
            </div>
            </section>
            <section class="glass-panel p-8 rounded-xl space-y-6">
            <h3 class="font-label-bold text-zinc-400 uppercase tracking-widest">Card Details</h3>
            <div class="space-y-4">
            <div>
            <label class="block text-xs font-label-bold text-zinc-500 mb-2 uppercase">Cardholder Name</label>
            <input class="w-full bg-background border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-primary-container focus:ring-0 outline-none transition-colors" placeholder="NGUYEN VAN A" type="text"/>
            </div>
            <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
            <label class="block text-xs font-label-bold text-zinc-500 mb-2 uppercase">Card Number</label>
            <input class="w-full bg-background border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-primary-container focus:ring-0 outline-none transition-colors" placeholder="0000 0000 0000 0000" type="text"/>
            </div>
            <div>
            <label class="block text-xs font-label-bold text-zinc-500 mb-2 uppercase">Expiry Date</label>
            <input class="w-full bg-background border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-primary-container focus:ring-0 outline-none transition-colors" placeholder="MM/YY" type="text"/>
            </div>
            <div>
            <label class="block text-xs font-label-bold text-zinc-500 mb-2 uppercase">CVV</label>
            <input class="w-full bg-background border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:border-primary-container focus:ring-0 outline-none transition-colors" placeholder="***" type="password"/>
            </div>
            </div>
            </div>
            </section>
            </div>

            <div class="lg:col-span-5">
            <div class="glass-panel rounded-2xl overflow-hidden sticky top-24">
            <div class="relative h-48">
            <img class="w-full h-full object-cover" data-alt="A wide panoramic cinematic shot of a futuristic cyberpunk city at night with neon lights and flying vehicles. The scene is dominated by deep blacks and vibrant reds, mirroring the theater-like atmosphere of the UI. Soft rain effects and glowing holographic advertisements add depth and a moody, immersive vibe to the composition." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeTwxfhm681yY0xjZQenlkSVVUKJFMjufKMFxsdHc9CSFf6Ujs4LuXoAirEPBdkCz3SkKAY5wo8f1-ktkxYY6m0QchCj1QuDpSRavKen_bZo2kDo3r_TbJiy29TxMrEuR31IMzEciOyB19DQwXuQFVpDrLZcEb-uORY4GwUoh-QJIqYT-S_MNeUCCZo6FAMJ69AIl3TP3R5fFRJ5uxHc6XAan3q53bS8dmoxgkx33aYVlTwQUqK49ARMTKCrj8CbmldP3HwPRSLEo"/>
            <div class="absolute inset-0 cinema-gradient"></div>
            <div class="absolute bottom-4 left-6">
            <span class="bg-primary-container text-white text-[10px] px-2 py-1 rounded font-bold mb-2 inline-block">PREMIUM EXTRA</span>
            <h2 class="text-white font-headline-md leading-tight">Dune: Part Two</h2>
            </div>
            </div>
            <div class="p-8 space-y-6">
            <div class="grid grid-cols-2 gap-y-4">
            <div>
            <p class="text-[10px] text-zinc-500 font-label-bold uppercase tracking-widest">Cinema</p>
            <p class="text-sm font-medium text-zinc-200">Starview Grand, Hall 4</p>
            </div>
            <div>
            <p class="text-[10px] text-zinc-500 font-label-bold uppercase tracking-widest">Date &amp; Time</p>
            <p class="text-sm font-medium text-zinc-200">Thu, 24 Oct • 20:30</p>
            </div>
            <div>
            <p class="text-[10px] text-zinc-500 font-label-bold uppercase tracking-widest">Seats</p>
            <p class="text-sm font-medium text-zinc-200">H12, H13 (Premium)</p>
            </div>
            <div>
            <p class="text-[10px] text-zinc-500 font-label-bold uppercase tracking-widest">Booking ID</p>
            <p class="text-sm font-medium text-zinc-200">#CR-88291</p>
            </div>
            </div>
            <div class="h-px bg-zinc-800"></div>
            <div class="space-y-2">
            <div class="flex justify-between text-sm">
            <span class="text-zinc-400">Tickets (2x)</span>
            <span class="text-zinc-200">280,000 VND</span>
            </div><div class="flex justify-between items-center text-sm cursor-pointer group">
                <span class="text-zinc-400">Voucher</span>
                <div class="flex items-center text-primary-container group-hover:brightness-125 transition-all">
                    <span class="font-medium mr-1">Chọn ngay</span>
                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                </div>
            </div>

            </div>
            <div class="flex justify-between items-center pt-4 border-t border-dashed border-zinc-700">
            <span class="text-zinc-400 font-label-bold uppercase tracking-widest">Total Amount</span>
            <span class="text-2xl font-headline-md text-primary-container">280,000 VND</span>
            </div>
            <button class="w-full bg-primary-container text-white py-4 rounded-xl font-headline-md hover:brightness-110 active:scale-[0.98] transition-all">
                                        CONFIRM PAYMENT
                                    </button>
            <p class="text-[10px] text-center text-zinc-500 px-8">
                                        By clicking confirm, you agree to our Terms of Service and Privacy Policy. All sales are final.
                                    </p>
            </div>
            </div>
            </div>
            </div>

            <section class="mt-24 border-t border-zinc-800 pt-16">
            <div class="max-w-2xl mx-auto">
            <div class="text-center mb-12">
            <div class="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 class="font-headline-lg text-white">Payment Successful!</h2>
            <p class="text-zinc-400">Your tickets have been confirmed and sent to your email.</p>
            </div>

            <div class="relative">

            <div class="bg-zinc-900 rounded-t-3xl p-8 border-x border-t border-zinc-800">
            <div class="flex justify-between items-start">
            <div>
            <p class="text-[10px] text-zinc-500 font-label-bold uppercase tracking-widest mb-1">Movie Title</p>
            <h3 class="text-2xl font-headline-md text-white mb-4">Dune: Part Two</h3>
            <div class="flex space-x-6">
            <div>
            <p class="text-[10px] text-zinc-500 font-label-bold uppercase tracking-widest">Date</p>
            <p class="text-sm font-bold">24 Oct 2024</p>
            </div>
            <div>
            <p class="text-[10px] text-zinc-500 font-label-bold uppercase tracking-widest">Time</p>
            <p class="text-sm font-bold">20:30</p>
            </div>
            <div>
            <p class="text-[10px] text-zinc-500 font-label-bold uppercase tracking-widest">Hall</p>
            <p class="text-sm font-bold">Hall 04</p>
            </div>
            </div>
            </div>
            <div class="text-right">
            <div class="text-primary-container text-4xl font-black italic mb-2">CINE</div>
            <p class="text-[10px] text-zinc-500 font-label-bold uppercase tracking-widest">Electronic Ticket</p>
            </div>
            </div>
            </div>

            <div class="flex items-center bg-zinc-900 border-x border-zinc-800">
            <div class="w-8 h-8 rounded-full bg-background -ml-4 border-r border-zinc-800"></div>
            <div class="flex-grow border-t-2 border-dashed border-zinc-800 mx-2"></div>
            <div class="w-8 h-8 rounded-full bg-background -mr-4 border-l border-zinc-800"></div>
            </div>

            <div class="bg-zinc-900 rounded-b-3xl p-8 border-x border-b border-zinc-800 text-center">
            <div class="bg-white p-4 rounded-xl inline-block mb-4">
            <img class="w-48 h-48 object-cover rounded-sm" data-alt="A clean, high-contrast QR code rendered on a pure white surface, designed for high visibility and digital scanning. The surrounding environment is minimalist and technologically inspired, with subtle depth and slate gray shadows that emphasize the importance of this digital asset within the movie-going journey." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvbLPdaFWy98VMuNNGUcbxhMC6fdfs7M5SfW0pr18LhtZRgHM-qesGQgi5CtLz6N1w91j44j8G_HvvhUVXWp0geaabMv1sKAariwZOmvMburgBHz5jnDsCeA0-U8awYFWO1XSKXLkdjseaUXAk6AqdfdfuVhhmBGTcQ6Q7ZjQoHyZAdiSzMmuAy6E0DMsidBei_Ct1xVbsNqRrRwDLysmvNHtWZwq7HeiIEMcezxwfDgVoPyn_BBV9Ln57_sVrtx23R8EeP_PpRus"/>
            </div>
            <p class="text-lg font-mono text-white tracking-[0.5em] mb-1">CR-88291-TX02</p>
            <p class="text-[10px] text-zinc-500 font-label-bold uppercase tracking-widest">Scan this code at the theater entrance</p>
            </div>
            </div>
            <div class="flex mt-8 justify-center">
            <button class="border border-zinc-800 text-zinc-200 py-3 rounded-xl font-label-bold hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-2 px-12">
            <span class="material-symbols-outlined text-sm">download</span>
            <span class="">SAVE TICKET</span>
            </button>

            </div>
            </div>
            </section>
        </div>
    </main>
}

export default ContentPayment