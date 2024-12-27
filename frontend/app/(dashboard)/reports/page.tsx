import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { getReports } from '@/lib/requestLib';
import { ReportList } from "./report"

export default async function reportPage() {
    const session = await auth();
    const token = session?.user?.token;
    const reports = await getReports(token);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Відгуки від клієнтів та майстрів</CardTitle>
                <CardDescription>Пропозиції та скарги від клієнтів та майстрів</CardDescription>
            </CardHeader>
            <CardContent>
                <ReportList reports={reports} />
            </CardContent>
        </Card>
    );
}
