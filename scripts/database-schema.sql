-- Create database schema for ReWear platform

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    points INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_swaps INTEGER DEFAULT 0,
    successful_swaps INTEGER DEFAULT 0,
    location VARCHAR(255),
    avatar_url VARCHAR(500),
    is_admin BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    item_type VARCHAR(100),
    size VARCHAR(50),
    condition VARCHAR(50) NOT NULL,
    brand VARCHAR(100),
    color VARCHAR(50),
    points INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, available, swapped, removed
    availability VARCHAR(50) DEFAULT 'available', -- available, pending_swap, swapped
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    tags TEXT[], -- Array of tags
    swap_preferences TEXT,
    rejection_reason TEXT,
    approved_by INTEGER REFERENCES users(id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Item images table
CREATE TABLE item_images (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Swaps table
CREATE TABLE swaps (
    id SERIAL PRIMARY KEY,
    requester_id INTEGER REFERENCES users(id),
    owner_id INTEGER REFERENCES users(id),
    requester_item_id INTEGER REFERENCES items(id),
    owner_item_id INTEGER REFERENCES items(id),
    status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected, completed, cancelled
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Points transactions table
CREATE TABLE points_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    item_id INTEGER REFERENCES items(id),
    transaction_type VARCHAR(50) NOT NULL, -- earned, spent, bonus, penalty
    points INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User favorites table
CREATE TABLE user_favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, item_id)
);

-- Reports table
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    reporter_id INTEGER REFERENCES users(id),
    reported_item_id INTEGER REFERENCES items(id),
    reported_user_id INTEGER REFERENCES users(id),
    reason VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, reviewed, resolved, dismissed
    reviewed_by INTEGER REFERENCES users(id),
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table (for swap communications)
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    swap_id INTEGER REFERENCES swaps(id) ON DELETE CASCADE,
    sender_id INTEGER REFERENCES users(id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_items_user_id ON items(user_id);
CREATE INDEX idx_items_category_id ON items(category_id);
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_availability ON items(availability);
CREATE INDEX idx_swaps_requester_id ON swaps(requester_id);
CREATE INDEX idx_swaps_owner_id ON swaps(owner_id);
CREATE INDEX idx_swaps_status ON swaps(status);
CREATE INDEX idx_points_transactions_user_id ON points_transactions(user_id);
CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX idx_reports_status ON reports(status);
