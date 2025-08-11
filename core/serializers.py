from rest_framework import serializers

from .models import VehicleCategory, Vehicle, Customer, Reservation, Rental, Payment, Maintenance


class VehicleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleCategory
        fields = ["id", "name", "daily_rate"]


class VehicleSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Vehicle
        fields = [
            "id",
            "plate_number",
            "make",
            "model",
            "year",
            "category",
            "category_name",
            "vin",
            "color",
            "transmission",
            "fuel_type",
            "odometer_km",
            "current_location",
            "status",
            "is_active",
        ]


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "driver_license_number",
            "address",
            "created_at",
        ]
        read_only_fields = ["created_at"]


class ReservationSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source="customer.__str__", read_only=True)
    vehicle_display = serializers.CharField(source="vehicle.__str__", read_only=True)

    class Meta:
        model = Reservation
        fields = [
            "id",
            "customer",
            "customer_name",
            "vehicle",
            "vehicle_display",
            "start_datetime",
            "end_datetime",
            "pickup_location",
            "dropoff_location",
            "status",
            "notes",
            "created_at",
        ]
        read_only_fields = ["created_at"]


class RentalSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source="customer.__str__", read_only=True)
    vehicle_display = serializers.CharField(source="vehicle.__str__", read_only=True)

    class Meta:
        model = Rental
        fields = [
            "id",
            "reservation",
            "customer",
            "customer_name",
            "vehicle",
            "vehicle_display",
            "start_datetime",
            "end_datetime_expected",
            "end_datetime_actual",
            "pickup_odometer_km",
            "return_odometer_km",
            "daily_rate_snapshot",
            "status",
            "created_at",
        ]
        read_only_fields = ["created_at"]


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            "id",
            "rental",
            "amount",
            "method",
            "status",
            "timestamp",
            "reference",
        ]
        read_only_fields = ["timestamp"]


class MaintenanceSerializer(serializers.ModelSerializer):
    vehicle_display = serializers.CharField(source="vehicle.__str__", read_only=True)

    class Meta:
        model = Maintenance
        fields = ["id", "vehicle", "vehicle_display", "date", "description", "cost", "odometer_km"]