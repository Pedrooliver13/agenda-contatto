// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const dateFormatter = (
  date: string,
  locale = 'pt-BR',
): string | void => {
  if (!date) {
    return;
  }

  return new Date(date).toLocaleDateString(locale);
};

// Crie uma função para gerar options de horas e minutos de 06:00 até 23:00 com intervalo de 15 minutos
export function getHoursOptions(): Array<{ label: string; value: string }> {
  const options: Array<{ label: string; value: string }> = [];

  for (let hour = 6; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      options.push({ label: value, value });
    }
  }

  return options;
}
