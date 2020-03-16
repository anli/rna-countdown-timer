import AsyncStorage from '@react-native-community/async-storage';
import {useCallback, useState} from 'react';
import UUIDGenerator from 'react-native-uuid-generator';

interface ItemProps {
  title: string;
  date: string;
  time?: string;
}

const useCountdownData = () => {
  const [values, setValues] = useState<any[]>([]);

  const create$ = async (item: ItemProps) => {
    const key = await UUIDGenerator.getRandomUUID();
    const value = JSON.stringify(item);
    await AsyncStorage.setItem(key, value);
    await load$();

    return;
  };

  const delete$ = async ({id}: {id: string}) => {
    await AsyncStorage.removeItem(id);
    return;
  };

  const load$ = useCallback(async () => {
    return getAll$().then(_values => {
      setValues(_values);
    });
  }, []);

  return {values, create$, delete$, load$};
};

export default useCountdownData;

const getAll$ = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const rawValues: [string, string | null][] = await AsyncStorage.multiGet(
    keys,
  );
  const values: {
    id: string;
    title: string;
    date: string;
    time?: string;
  }[] = rawValues.map(([_id, rawValue]) => {
    const obj = JSON.parse(rawValue || '');
    return {
      id: _id,
      title: obj.title || '',
      date: obj.date || '',
      time: obj.time || null,
    };
  });
  return values;
};
