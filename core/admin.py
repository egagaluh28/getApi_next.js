from django.contrib import admin

from .models import (
    VehicleCategory,
    Vehicle,
    Customer,
    Reservation,
    Rental,
    Payment,
    Maintenance,
)


@admin.register(VehicleCategory)
class VehicleCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "daily_rate")
    search_fields = ("name",)


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ("id", "plate_number", "make", "model", "year", "status", "is_active")
    list_filter = ("status", "is_active", "category")
    search_fields = ("plate_number", "make", "model")


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("id", "first_name", "last_name", "email", "phone")
    search_fields = ("first_name", "last_name", "email", "phone")


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "vehicle", "start_datetime", "end_datetime", "status")
    list_filter = ("status",)
    search_fields = ("customer__first_name", "customer__last_name", "vehicle__plate_number")


@admin.register(Rental)
class RentalAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "vehicle", "start_datetime", "end_datetime_expected", "status")
    list_filter = ("status",)


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "rental", "amount", "method", "status", "timestamp")
    list_filter = ("method", "status")


@admin.register(Maintenance)
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = ("id", "vehicle", "date", "cost", "odometer_km")
