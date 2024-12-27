'use client';

import { Button } from '@/components/ui/button';
import { createReport } from '@/lib/requestLib';

export function ReportForm({ token }: { token: string | undefined }) {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const report = event.target.feedback.value;

    try {
      if (!token) {
        throw new Error('Не вдалося отримати userId з токену');
      }

      const response = await createReport(token, report);
      console.log({ response });

      if (!response) {
        throw new Error('Не вдалося відправити скаргу');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="feedback" style={{ display: 'block', marginBottom: '8px' }}>
        Введіть, будь-ласка, вашу пропозицію або скаргу.
      </label>
      
      <div style={{ position: 'relative', width: '100%' }}>
        {/* Textarea with absolute positioned placeholder */}
        <textarea
          id="feedback"
          name="feedback"
          placeholder="Введіть свої пропозиції або скарги тут..."
          style={{
            width: '100%',
            height: '150px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            resize: 'vertical',
            position: 'relative',
            zIndex: 1,  
            background: 'transparent',
          }}
        />
      </div>

      <Button style={{ marginTop: '16px' }}>
        Відправити
      </Button>
    </form>
  );
}
