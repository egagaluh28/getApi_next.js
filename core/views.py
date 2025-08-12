from django.utils import timezone
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import VehicleCategory, Vehicle, Customer, Reservation, Rental, Payment, Maintenance
from .serializers import (
    VehicleCategorySerializer,
    VehicleSerializer,
    CustomerSerializer,
    ReservationSerializer,
    RentalSerializer,
    PaymentSerializer,
    MaintenanceSerializer,
)


class VehicleCategoryViewSet(viewsets.ModelViewSet):
    queryset = VehicleCategory.objects.all().order_by("name")
    serializer_class = VehicleCategorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["name"]


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all().order_by("plate_number")
    serializer_class = VehicleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "category"]

    @action(detail=False, methods=["get"])
    def available(self, request):
        start = request.query_params.get("start")
        end = request.query_params.get("end")
        qs = Vehicle.objects.filter(is_active=True, status=Vehicle.VehicleStatus.AVAILABLE)
        # If a date range is provided, exclude vehicles overlapping with reservations/rentals
        if start and end:
            try:
                start_dt = timezone.datetime.fromisoformat(start)
                end_dt = timezone.datetime.fromisoformat(end)
            except Exception:
                return Response({"detail": "Invalid datetime format. Use ISO 8601."}, status=400)

            overlapping_reservations = Q(reservations__start_datetime__lt=end_dt, reservations__end_datetime__gt=start_dt)
            overlapping_rentals = Q(rentals__start_datetime__lt=end_dt, rentals__end_datetime_expected__gt=start_dt, rentals__status__in=[Rental.RentalStatus.ACTIVE, Rental.RentalStatus.LATE])
            qs = qs.exclude(overlapping_reservations | overlapping_rentals).distinct()
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by("-created_at")
    serializer_class = CustomerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["email", "phone"]


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.select_related("customer", "vehicle").all()
    serializer_class = ReservationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "vehicle", "customer"]


class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.select_related("customer", "vehicle").all()
    serializer_class = RentalSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "vehicle", "customer"]


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.select_related("rental").all()
    serializer_class = PaymentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["method", "status", "rental"]


class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.select_related("vehicle").all()
    serializer_class = MaintenanceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["vehicle"]
