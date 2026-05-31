import { format, subMonths } from "date-fns";



export const localDate = () =>{
    const today = new Date();
    const a2e = (s:string) => s.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());

    const fullDateF = today.toLocaleDateString("fa-IR");
    const monthAgoF = subMonths(today, 1).toLocaleDateString("fa-IR");
    const monthAgo = a2e(monthAgoF).replaceAll('/', '-');
    const fullDate = a2e(fullDateF).replaceAll('/', '-');
    const time = format(today, 'HH:mm:ss');

    return { fullDate, monthAgo, time }
}