CREATE TABLE parking_slots (
  id SERIAL PRIMARY KEY,
  slot_number VARCHAR(20) UNIQUE NOT NULL,
  status VARCHAR(15) CHECK (status IN ('available', 'occupied', 'reserved')) DEFAULT 'available',
  level INT DEFAULT 1,
  type_supported VARCHAR(10) CHECK (type_supported IN ('car', 'bike', 'truck')) NOT NULL
);

CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  license_plate VARCHAR(20) UNIQUE NOT NULL,
  type VARCHAR(10) CHECK (type IN ('car', 'bike', 'truck')) NOT NULL,
  color VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password_hash TEXT NOT NULL,
  role VARCHAR(10) CHECK (role IN ('user', 'admin')) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  booking_id INT NOT NULL,
  method VARCHAR(10) CHECK (method IN ('UPI', 'Card', 'Cash')) NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  transaction_id VARCHAR(100),
  status VARCHAR(10) CHECK (status IN ('success', 'failed', 'pending')) DEFAULT 'pending',
  paid_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  vehicle_id INT NOT NULL,
  slot_id INT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  status VARCHAR(15) CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
  fee NUMERIC(10,2),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  FOREIGN KEY (slot_id) REFERENCES parking_slots(id)
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(20) CHECK (type IN ('booking', 'payment', 'alert')) NOT NULL,
  message TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
