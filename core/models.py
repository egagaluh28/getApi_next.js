from django.db import models
from django.utils import timezone


class VehicleCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    daily_rate = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return f"{self.name} (Rp {self.daily_rate}/hari)"


class Vehicle(models.Model):
    class VehicleStatus(models.TextChoices):
        AVAILABLE = "available", "Available"
        RENTED = "rented", "Rented"
        MAINTENANCE = "maintenance", "Maintenance"
        INACTIVE = "inactive", "Inactive"

    plate_number = models.CharField(max_length=20, unique=True)
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    category = models.ForeignKey(VehicleCategory, on_delete=models.PROTECT, related_name="vehicles")
    vin = models.CharField(max_length=64, blank=True)
    color = models.CharField(max_length=50, blank=True)
    transmission = models.CharField(max_length=20, blank=True)
    fuel_type = models.CharField(max_length=20, blank=True)
    odometer_km = models.PositiveIntegerField(default=0)
    current_location = models.CharField(max_length=200, blank=True)
    status = models.CharField(max_length=20, choices=VehicleStatus.choices, default=VehicleStatus.AVAILABLE)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.plate_number} - {self.make} {self.model} ({self.year})"


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30)
    driver_license_number = models.CharField(max_length=50, unique=True)
    address = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"


class Reservation(models.Model):
    class ReservationStatus(models.TextChoices):
        RESERVED = "reserved", "Reserved"
        CANCELLED = "cancelled", "Cancelled"
        COMPLETED = "completed", "Completed"

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="reservations")
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT, related_name="reservations")
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    pickup_location = models.CharField(max_length=200)
    dropoff_location = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=ReservationStatus.choices, default=ReservationStatus.RESERVED)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-start_datetime"]

    def __str__(self) -> str:
        return f"Reservation #{self.id} - {self.customer} - {self.vehicle}"


class Rental(models.Model):
    class RentalStatus(models.TextChoices):
        ACTIVE = "active", "Active"
        CLOSED = "closed", "Closed"
        LATE = "late", "Late"

    reservation = models.OneToOneField(Reservation, on_delete=models.SET_NULL, null=True, blank=True, related_name="rental")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="rentals")
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT, related_name="rentals")
    start_datetime = models.DateTimeField(default=timezone.now)
    end_datetime_expected = models.DateTimeField()
    end_datetime_actual = models.DateTimeField(null=True, blank=True)
    pickup_odometer_km = models.PositiveIntegerField(default=0)
    return_odometer_km = models.PositiveIntegerField(null=True, blank=True)
    daily_rate_snapshot = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=RentalStatus.choices, default=RentalStatus.ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-start_datetime"]

    def __str__(self) -> str:
        return f"Rental #{self.id} - {self.customer} - {self.vehicle}"


class Payment(models.Model):
    class PaymentMethod(models.TextChoices):
        CASH = "cash", "Cash"
        CARD = "card", "Card"
        TRANSFER = "transfer", "Transfer"
        EWALLET = "ewallet", "E-Wallet"

    class PaymentStatus(models.TextChoices):
        PENDING = "pending", "Pending"
        COMPLETED = "completed", "Completed"
        FAILED = "failed", "Failed"

    rental = models.ForeignKey(Rental, on_delete=models.CASCADE, related_name="payments")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    method = models.CharField(max_length=20, choices=PaymentMethod.choices)
    status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.COMPLETED)
    timestamp = models.DateTimeField(auto_now_add=True)
    reference = models.CharField(max_length=100, blank=True)

    def __str__(self) -> str:
        return f"Payment #{self.id} - {self.rental} - Rp {self.amount} ({self.method})"


class Maintenance(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="maintenances")
    date = models.DateField(default=timezone.now)
    description = models.TextField()
    cost = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    odometer_km = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return f"Maintenance #{self.id} - {self.vehicle} - {self.date}"
