import App from './App';
import React from 'react';
import SignUpPage from './SignUpPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

test('renders sign-up form with all fields and submit button', () => {
  render(
    <Router>
      <SignUpPage />
    </Router>
  );

  // Перевірка наявності всіх полів форми та кнопки "Sign Up"
  expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});

test('displays error message when passwords do not match', async () => {
  render(
    <Router>
      <SignUpPage />
    </Router>
  );

  // Симулюємо введення даних у форму
  fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password456' } });

  // Клацання на кнопку "Sign Up"
  fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

  // Перевірка, що з'являється повідомлення про помилку
  expect(await screen.findByText('Passwords do not match')).toBeInTheDocument();
});





import { MemoryRouter } from 'react-router-dom'; // Додали імпорт MemoryRouter
import CreateEventForm from './CreateEventForm';

test('renders create event form with all fields and submit button', async () => {
  render(
    <MemoryRouter>
      <CreateEventForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Event Name' } });
  fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-05-25' } });
  fireEvent.click(screen.getByRole('button', { name: /Create Event/i })); // Змінено селектор на getByRole


});



import DeleteEventPage from './DeleteEvent';

test('renders delete event form and deletes event', async () => {
  render(<DeleteEventPage />);

  // Mock fetchEvents function to populate events
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'Test Event 1' }, { id: 2, name: 'Test Event 2' }]),
  });

  // Wait for events to be populated
  await waitFor(() => screen.getByText('--Select an event--'));


});



test('should delete event when Delete button is clicked', async () => {
  render(<DeleteEventPage />);

  // Моделюємо вибір події у випадаючому списку
  const eventName = 'Event 1';
  const selectElement = screen.getByRole('combobox');
  fireEvent.change(selectElement, { target: { value: eventName } });

  // Моделюємо натискання кнопки Delete
  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);
});




import HomePage from './HomePage';

describe('HomePage component', () => {
  it('renders welcome message and buttons', () => {
    // Рендеримо компонент HomePage в обгортці Router, щоб мати доступ до Link компонентів
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Перевіряємо, чи є текст "Welcome" на сторінці
    const welcomeMessage = screen.getByText('Welcome');
    expect(welcomeMessage).toBeInTheDocument();

    // Перевіряємо наявність кнопок Sign In і Sign Up
    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    expect(signInButton).toBeInTheDocument();

    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
    expect(signUpButton).toBeInTheDocument();
  });


});





describe('App component routing', () => {
  it('renders Home page for path /', () => {
    render(
        <App />
    );
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

});





import EditEventForm from './EditEvent';

describe('EditEventForm', () => {
  it('should submit the form and log success message on successful update', async () => {
    render(<EditEventForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Current Event Name:'), { target: { value: 'Event1' } });
    fireEvent.change(screen.getByLabelText('New Event Name:'), { target: { value: 'NewEvent' } });
    fireEvent.change(screen.getByLabelText('New Event Date:'), { target: { value: '2024-06-30' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Update Event/i }));


  });

  it('should log an error message on failed update', async () => {
    render(<EditEventForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Current Event Name:'), { target: { value: 'Event2' } });
    fireEvent.change(screen.getByLabelText('New Event Name:'), { target: { value: 'NewEvent2' } });
    fireEvent.change(screen.getByLabelText('New Event Date:'), { target: { value: '2024-06-30' } });

    // Mock a failed update request
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Update Event/i }));

    // Wait for the form submission

  });
});


import EditUserPage from './EditPage';

describe('EditUserPage', () => {
  it('should submit the form and redirect to user info page on successful update', async () => {
    render(<EditUserPage />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'newpassword' } });

    // Mock a successful update request
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    // Wait for the form submission and redirection

  });

  it('should display an error message on failed update', async () => {
    render(<EditUserPage />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'newpassword' } });

    // Mock a failed update request
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    // Wait for the form submission

  });
});


import {Route, Routes } from 'react-router-dom';
import PersonalCabinet from './PersonalCabinet';

describe('PersonalCabinet', () => {
  it('should toggle dropdown menu when user profile is clicked', () => {
    render(
      <MemoryRouter>
        <PersonalCabinet />
      </MemoryRouter>
    );

    // Initially, the dropdown menu should not be visible
    expect(screen.queryByText('Information')).toBeNull();
    expect(screen.queryByText('Exit')).toBeNull();

    // Click on the user profile
    fireEvent.click(screen.getByText('User Profile'));

    // After clicking, the dropdown menu should be visible
    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();

    // Click again to close the dropdown menu
    fireEvent.click(screen.getByText('User Profile'));

    // After clicking again, the dropdown menu should not be visible
    expect(screen.queryByText('Information')).toBeNull();
    expect(screen.queryByText('Exit')).toBeNull();
  });


});


import SignInPage, { userId2 } from './SignInPage';

describe('SignInPage', () => {
  it('should sign in with correct credentials and navigate to personal cabinet', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      password: 'password123'
    };

    // Mock the fetch function to return a successful response with mock user data
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser)
    });

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );

    // Fill in email and password fields
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: mockUser.email }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: mockUser.password }
    });

    // Submit the form
    fireEvent.click(screen.getByText('Sign In'));

    // Wait for the redirect to personal cabinet


    // Check that the error message is not displayed
    expect(screen.queryByTestId('error-message')).toBeNull();
  });


});






describe('SignInPage Component', () => {
  it('renders sign in form and handles sign in with correct credentials', async () => {
    render(
      <Router>
        <SignInPage />
      </Router>
    );

    // Arrange: Find input fields and button
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Sign In');

    // Act: Type correct email and password, then submit the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'correctpassword' } });
    fireEvent.click(submitButton);

    // Assert: Check if redirected to personal cabinet page

  });

  it('renders sign in form and shows error message with incorrect credentials', async () => {
    render(
      <Router>
        <SignInPage />
      </Router>
    );

    // Arrange: Find input fields and button
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Sign In');

    // Act: Type incorrect email and password, then submit the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'incorrectpassword' } });
    fireEvent.click(submitButton);

    // Assert: Check if error message appears after form submission

  });
});





import UserInfo from './UserInfo';
import { BrowserRouter } from 'react-router-dom';


test('renders user information', () => {
  render(
    <BrowserRouter>
      <UserInfo />
    </BrowserRouter>
  );

  // Перевіряємо наявність тексту "User Information"
  expect(screen.getByText('User Information')).toBeInTheDocument();

  // Перевіряємо наявність кнопок "Edit Profile" і "Delete Profile"
  expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  expect(screen.getByText('Delete Profile')).toBeInTheDocument();
});

test('handles profile deletion', () => {
  render(
    <BrowserRouter>
      <UserInfo />
    </BrowserRouter>
  );

  // Симулюємо клік по кнопці "Delete Profile"
  fireEvent.click(screen.getByText('Delete Profile'));


});




test('should delete event when Delete button is clicked1', async () => {
  // Макетуємо fetchEvents для заповнення подій
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'Test Event 1' }, { id: 2, name: 'Test Event 2' }]),
  });

  // Рендеримо DeleteEventPage
  const { getByText, getByRole, getByLabelText } = render(<DeleteEventPage />);

  // Очікуємо, що подія буде завантажена і відображена
  await waitFor(() => getByText('--Select an event--'));

  // Моделюємо вибір події у випадаючому списку
  const selectElement = getByRole('combobox');
  fireEvent.change(selectElement, { target: { value: 'Test Event 1' } });

  // Моделюємо натискання кнопки Delete
  const deleteButton = getByText('Delete');
  fireEvent.click(deleteButton);

  // Очікуємо, що після успішного видалення буде відображено повідомлення
});


test('should display error message if no event selected for deletion', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'Test Event 1' }, { id: 2, name: 'Test Event 2' }]),
  });

  const { getByText } = render(<DeleteEventPage />);
  await waitFor(() => getByText('--Select an event--'));

  const deleteButton = getByText('Delete');
  fireEvent.click(deleteButton);


});





test('registers user successfully and redirects to personal cabinet', async () => {
  render(
    <Router>
      <SignUpPage />
    </Router>
  );

  // Заповнюємо дані у формі
  fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'johndoe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

  // Клацання на кнопку "Sign Up"
  fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

  // Очікуємо, що після реєстрації користувача буде перенаправлено на особистий кабінет
});


test('displays error message when passwords do not match1', async () => {
  render(
    <Router>
      <SignUpPage />
    </Router>
  );

  // Заповнюємо дані у формі з неправильним підтвердженням пароля
  fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'johndoe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'differentpassword' } });

  // Клацання на кнопку "Sign Up"
  fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

  // Очікуємо, що з'явиться повідомлення про помилку
  expect(await screen.findByText('Passwords do not match')).toBeInTheDocument();
});



test('displays error message on failed user registration', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: false,
    json: () => Promise.resolve({ detail: 'Email already exists' }),
  });

  render(
    <Router>
      <SignUpPage />
    </Router>
  );

  // Заповнюємо дані у формі
  fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'existingemail@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

  // Клацання на кнопку "Sign Up"
  fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

  // Очікуємо, що з'явиться повідомлення про помилку
  expect(await screen.findByText('Email already exists')).toBeInTheDocument();
});




import UserEvents from './UserEvents';
test('renders list of events', async () => {
  const mockEvents = [
    { id: 1, name: 'Event 1', date: '2024-06-01' },
    { id: 2, name: 'Event 2', date: '2024-06-15' },
    { id: 3, name: 'Event 3', date: '2024-07-10' },
  ];

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockEvents),
  });

  render(<UserEvents />);

  const eventItems = await screen.findAllByRole('listitem');
  expect(eventItems.length).toBe(mockEvents.length);
});




test('displays error message on failed fetch', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: false,
    status: 404,
    json: () => Promise.resolve({ message: 'Not Found' }),
  });

  render(<UserEvents />);

  const errorMessage = await screen.findByText('Failed to fetch events');
  expect(errorMessage).toBeInTheDocument();
});







