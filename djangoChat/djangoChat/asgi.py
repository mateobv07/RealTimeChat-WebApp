"""
ASGI config for djangoChat project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djangoChat.settings")

django_application = get_asgi_application()

from . import urls  # noqa isort:skip

application = ProtocolTypeRouter(
    {
        "http": django_application,
        "websocket": URLRouter(urls.websockets_url_patterns),
    }
)
