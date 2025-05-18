import { useState, useEffect } from 'react';
import { apiService, Branch, Driver, User, Parcel, Payment, SupportRequest } from '../services/api';

export function useBranches() {
  const [data, setData] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getBranches();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch branches'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useDrivers() {
  const [data, setData] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getDrivers();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch drivers'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useUsers() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getUsers();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch users'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useParcels() {
  const [data, setData] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getParcels();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch parcels'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useParcel(id: string) {
  const [data, setData] = useState<Parcel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getParcelById(id);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch parcel'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { data, loading, error };
}

export function usePayments() {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getPayments();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch payments'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useSupportRequests() {
  const [data, setData] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getSupportRequests();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch support requests'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}