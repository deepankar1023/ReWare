-- Seed data for ReWear platform

-- Insert categories
INSERT INTO categories (name, description) VALUES
('Tops', 'Shirts, blouses, t-shirts, and other upper body clothing'),
('Bottoms', 'Pants, jeans, shorts, and skirts'),
('Dresses', 'All types of dresses and jumpsuits'),
('Outerwear', 'Jackets, coats, blazers, and sweaters'),
('Footwear', 'Shoes, boots, sneakers, and sandals'),
('Accessories', 'Bags, jewelry, scarves, and other accessories');

-- Insert sample users
INSERT INTO users (email, password_hash, first_name, last_name, points, rating, total_swaps, successful_swaps, location) VALUES
('sarah@example.com', '$2b$10$example_hash_1', 'Sarah', 'Johnson', 125, 4.8, 23, 21, 'New York, NY'),
('emma@example.com', '$2b$10$example_hash_2', 'Emma', 'Wilson', 89, 4.9, 15, 14, 'Los Angeles, CA'),
('mike@example.com', '$2b$10$example_hash_3', 'Mike', 'Chen', 156, 4.7, 31, 28, 'Chicago, IL'),
('lisa@example.com', '$2b$10$example_hash_4', 'Lisa', 'Park', 203, 4.6, 42, 38, 'Boston, MA'),
('admin@rewear.com', '$2b$10$example_hash_admin', 'Admin', 'User', 0, 5.0, 0, 0, 'San Francisco, CA');

-- Update admin user
UPDATE users SET is_admin = TRUE WHERE email = 'admin@rewear.com';

-- Insert sample items
INSERT INTO items (user_id, title, description, category_id, item_type, size, condition, brand, color, points, status, availability, tags, swap_preferences) VALUES
(1, 'Vintage Denim Jacket', 'Beautiful vintage denim jacket in excellent condition. This classic piece features authentic distressing and a perfect fit.', 4, 'Jacket', 'M', 'Good', 'Levi''s', 'Blue', 25, 'approved', 'available', ARRAY['vintage', 'denim', 'casual'], 'Looking for sweaters or cardigans'),
(1, 'Designer Silk Blouse', 'Luxury silk blouse from premium brand. Perfect for office or special occasions.', 1, 'Blouse', 'S', 'Excellent', 'Theory', 'White', 35, 'approved', 'available', ARRAY['designer', 'silk', 'formal'], 'Interested in other professional wear'),
(2, 'Athletic Running Shoes', 'Barely worn Nike running shoes. Great for workouts or casual wear.', 5, 'Sneakers', '9', 'Like New', 'Nike', 'Black', 40, 'approved', 'available', ARRAY['athletic', 'running', 'nike'], 'Looking for other athletic wear'),
(2, 'Wool Winter Coat', 'Warm wool coat perfect for cold weather. Classic style that never goes out of fashion.', 4, 'Coat', 'L', 'Good', 'J.Crew', 'Navy', 50, 'approved', 'available', ARRAY['wool', 'winter', 'warm'], 'Open to any outerwear'),
(3, 'Summer Floral Dress', 'Light and airy summer dress with beautiful floral pattern. Perfect for warm weather.', 3, 'Dress', 'M', 'Excellent', 'Zara', 'Floral', 30, 'approved', 'available', ARRAY['summer', 'floral', 'casual'], 'Looking for other dresses'),
(3, 'Leather Handbag', 'Genuine leather handbag in excellent condition. Spacious and stylish.', 6, 'Handbag', 'One Size', 'Good', 'Coach', 'Brown', 45, 'approved', 'available', ARRAY['leather', 'handbag', 'designer'], 'Interested in other accessories');

-- Insert item images
INSERT INTO item_images (item_id, image_url, is_primary, display_order) VALUES
(1, '/placeholder.svg?height=400&width=400&text=Denim+Jacket+1', TRUE, 1),
(1, '/placeholder.svg?height=400&width=400&text=Denim+Jacket+2', FALSE, 2),
(2, '/placeholder.svg?height=400&width=400&text=Silk+Blouse+1', TRUE, 1),
(2, '/placeholder.svg?height=400&width=400&text=Silk+Blouse+2', FALSE, 2),
(3, '/placeholder.svg?height=400&width=400&text=Running+Shoes+1', TRUE, 1),
(4, '/placeholder.svg?height=400&width=400&text=Winter+Coat+1', TRUE, 1),
(5, '/placeholder.svg?height=400&width=400&text=Floral+Dress+1', TRUE, 1),
(6, '/placeholder.svg?height=400&width=400&text=Leather+Bag+1', TRUE, 1);

-- Insert sample swaps
INSERT INTO swaps (requester_id, owner_id, requester_item_id, owner_item_id, status, message) VALUES
(2, 1, 3, 1, 'pending', 'Hi! I love your vintage denim jacket. Would you be interested in swapping for my running shoes?'),
(3, 2, 5, 4, 'completed', 'Great swap! Thank you for the beautiful coat.'),
(1, 3, 2, 6, 'accepted', 'Perfect! I''ve been looking for a leather handbag like this.');

-- Insert points transactions
INSERT INTO points_transactions (user_id, item_id, transaction_type, points, description) VALUES
(1, 1, 'earned', 25, 'Points earned for listing Vintage Denim Jacket'),
(1, 2, 'earned', 35, 'Points earned for listing Designer Silk Blouse'),
(2, 3, 'earned', 40, 'Points earned for listing Athletic Running Shoes'),
(2, 4, 'earned', 50, 'Points earned for listing Wool Winter Coat'),
(3, 5, 'earned', 30, 'Points earned for listing Summer Floral Dress'),
(3, 6, 'earned', 45, 'Points earned for listing Leather Handbag'),
(2, NULL, 'bonus', 10, 'Bonus points for successful swap'),
(3, NULL, 'bonus', 10, 'Bonus points for successful swap');

-- Insert some favorites
INSERT INTO user_favorites (user_id, item_id) VALUES
(1, 3),
(1, 4),
(2, 1),
(2, 5),
(3, 2),
(4, 1);

-- Update item views and likes
UPDATE items SET views = 45, likes = 12 WHERE id = 1;
UPDATE items SET views = 32, likes = 8 WHERE id = 2;
UPDATE items SET views = 67, likes = 15 WHERE id = 3;
UPDATE items SET views = 28, likes = 6 WHERE id = 4;
UPDATE items SET views = 41, likes = 11 WHERE id = 5;
UPDATE items SET views = 35, likes = 9 WHERE id = 6;
