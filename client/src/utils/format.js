const bn = new Intl.DateTimeFormat("bn-BD", { dateStyle: "medium" });
const bnTime = new Intl.DateTimeFormat("bn-BD", { dateStyle: "medium", timeStyle: "short" });

export const formatDate = (d) => (d ? bn.format(new Date(d)) : "");
export const formatDateTime = (d) => (d ? bnTime.format(new Date(d)) : "");
export const formatPrice = (p) => (Number(p) > 0 ? `৳${new Intl.NumberFormat("bn-BD").format(p)}` : "বিনামূল্যে");
export const today = () => new Date().toISOString().slice(0, 10);

export const LEVELS = { beginner: "শুরুর স্তর", intermediate: "মাঝারি", advanced: "উচ্চ স্তর" };
export const ROLES = { student: "শিক্ষার্থী", teacher: "শিক্ষক", admin: "অ্যাডমিন" };
export const STATUS = { present: "উপস্থিত", absent: "অনুপস্থিত", late: "দেরিতে" };
