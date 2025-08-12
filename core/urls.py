from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    VehicleCategoryViewSet,
    VehicleViewSet,
    CustomerViewSet,
    ReservationViewSet,
    RentalViewSet,
    PaymentViewSet,
    MaintenanceViewSet,
)

router = DefaultRouter()
router.register(r'vehicle-categories', VehicleCategoryViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'reservations', ReservationViewSet)
router.register(r'rentals', RentalViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'maintenances', MaintenanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]