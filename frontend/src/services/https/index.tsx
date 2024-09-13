import { EmployeeInterface } from "../../interfaces/IEmployee";
import { PositionInterface } from "../../interfaces/IPosition";

const apiUrl = "http://localhost:8000";

// Utility function to handle API requests with generics
async function fetchFromApi<T>(endpoint: string, method: string, body?: unknown): Promise<T | false> {
  const requestOptions: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, requestOptions);
    if (response.ok) {
      return await response.json() as T;
    } else {
      return false;
    }
  } catch (error) {
    console.error("API request error:", error);
    return false;
  }
}

// GET /employees
async function GetUsers(): Promise<EmployeeInterface[] | false> {
  return fetchFromApi<EmployeeInterface[]>('/employees', 'GET');
}

// GET /positions
async function GetGenders(): Promise<PositionInterface[] | false> {
  return fetchFromApi<PositionInterface[]>('/positions', 'GET');
}

// DELETE /employees/:id
async function DeleteUserByID(id: number | undefined): Promise<boolean> {
  if (id === undefined) return false;
  const result = await fetchFromApi<null>(`/employees/${id}`, 'DELETE');
  return result !== false;
}

// GET /employees/:id
async function GetUserById(id: number | undefined): Promise<EmployeeInterface | false> {
  if (id === undefined) return false;
  return fetchFromApi<EmployeeInterface>(`/employees/${id}`, 'GET');
}

// POST /employees
async function CreateUser(data: EmployeeInterface): Promise<EmployeeInterface | false> {
  return fetchFromApi<EmployeeInterface>('/employees', 'POST', data);
}

// PATCH /employees/:id
async function UpdateUser(id: number | undefined, data: Partial<EmployeeInterface>): Promise<EmployeeInterface | false> {
  if (id === undefined) return false;
  return fetchFromApi<EmployeeInterface>(`/employees/${id}`, 'PATCH', data);
}

export {
  GetUsers,
  CreateUser,
  GetGenders,
  DeleteUserByID,
  GetUserById,
  UpdateUser
};
