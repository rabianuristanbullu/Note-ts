// CUSTOM HOOK

// Gönderilen veriyi local storage'a eklemek
//Önce Local Storagedan hali hazırda olan verileri almamız gerek.
//Eğer daha önceden localde veri yoksa başlangıç değeri atıyoruz.
//şayet localde veri varsa jsonvalue'yi geri döndürüyoruz.
//useeffect kullanarak valuenin her değişiminde statein yeniden
//güncellenmesini sağlayacağız.
//son aşamada döndürülecek değerleri belirliyoruz.

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue === null) {
      return initialValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

return[value,setValue] as [T,typeof setValue];
}
