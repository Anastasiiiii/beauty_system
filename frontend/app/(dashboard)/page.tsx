import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function MainPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Домашня сторінка</CardTitle>
        <CardDescription>
          Вітаємо! Будь-ласка, увійдіть в систему для можливості надання послуг.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
