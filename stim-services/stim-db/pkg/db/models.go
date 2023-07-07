package db

import "time"

type User struct {
	ID           string     `gorm:"column:id;primaryKey;type:uuid;default:uuid_generate_v4()"`
	Username     string     `gorm:"column:username;unique"`
	PasswordHash string     `gorm:"column:password_hash"`
	Sessions     []Session  `gorm:"foreignKey:UserID"`
	Role         Role       `gorm:"column:role;default:USER;type:role_enum"`
	RentEvent    *RentEvent `gorm:"foreignKey:RentedByID"`
}

type Role string

const (
	RoleUser  Role = "USER"
	RoleAdmin Role = "ADMIN"
)

type Session struct {
	ID        string    `gorm:"column:id;primaryKey;type:uuid;default:uuid_generate_v4()"`
	Token     string    `gorm:"column:token;unique"`
	ExpiresAt time.Time `gorm:"column:expires_at"`
	UserID    string    `gorm:"column:user_id"`
	User      User      `gorm:"foreignKey:UserID"`
}

type Item struct {
	ID               int        `gorm:"column:id;primaryKey;autoIncrement"`
	Name             string     `gorm:"column:name"`
	Desc             string     `gorm:"column:desc"`
	PurchaseLink     string     `gorm:"column:purchase_link"`
	Image            *Image     `gorm:"foreignKey:ItemID"`
	CurrentRentEvent *RentEvent `gorm:"foreignKey:ItemID"`
}

type RentEvent struct {
	ID         int       `gorm:"column:id;primaryKey;autoIncrement"`
	ItemID     int       `gorm:"column:item_id;unique"`
	Item       Item      `gorm:"foreignKey:ItemID"`
	RentedByID string    `gorm:"column:rented_by_id;unique"`
	RentedBy   User      `gorm:"foreignKey:RentedByID"`
	RentedOn   time.Time `gorm:"column:rented_on"`
}

type Image struct {
	ID     int    `gorm:"column:id;primaryKey;autoIncrement"`
	URL    string `gorm:"column:url"`
	ItemID int    `gorm:"column:item_id;unique"`
	Item   Item   `gorm:"foreignKey:ItemID"`
}

type ServerAuthToken struct {
	ID    int    `gorm:"column:id;primaryKey;autoIncrement"`
	Token string `gorm:"column:token;unique;default:uuid_generate_v4()"`
}
