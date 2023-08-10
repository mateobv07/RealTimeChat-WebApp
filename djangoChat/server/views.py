from django.db.models import Count
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.response import Response

from .models import Category, Server
from .schema import server_list_docs
from .serializer import CategorySerializer, ServerSerializer


class CategoryListViewSet(viewsets.ViewSet):
    queryset = Category.objects.all()

    @extend_schema(responses=CategorySerializer)
    def list(self, rquest):
        serializer = CategorySerializer(self.queryset, many=True)
        return Response(serializer.data)


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    @server_list_docs
    def list(self, request):
        """Returns a list of servers filtered by various parameters."""
        # Retrieve query parameters from the request
        category = request.query_params.get("category")
        by_user = request.query_params.get("by_user") == "true"
        qty = request.query_params.get("qty")
        by_server_id = request.query_params.get("by_server_id")
        with_num_members = (
            request.query_params.get("with_num_members") == "true"
        )

        # Check if the user is authenticated before proceeding.
        # if not request.user.is_authenticated:
        #    raise AuthenticationFailed()

        # Filter the queryset based on the provided category, if any.
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        # Filter the queryset to only include servers where the requesting user is a member.
        if by_user:
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)

        # Limit the number of results returned based on the 'qty' parameter, if provided.
        if qty:
            self.queryset = self.queryset[: int(qty)]

        # Filter the queryset to only include the server with the specified 'by_server_id'
        # if the server with the provided ID does not exist, raise a validation error.
        if by_server_id:
            try:
                self.queryset = self.queryset.filter(id=by_server_id)
                if not self.queryset.exists():
                    raise ValidationError(
                        detail=f"Server with id {by_server_id} not found."
                    )
            except ValueError:
                raise ValidationError(detail="Server id value error.")

        # Annotate each server with the number of members it has, if requested.
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))

        # Serialize the queryset into JSON data using the ServerSerializer
        # passing 'num_members' in the context if 'with_num_members' is True.
        serializer = ServerSerializer(
            self.queryset, many=True, context={"num_members": with_num_members}
        )

        # Return the serialized data as a response.
        return Response(serializer.data)
