import os

from django.core.exceptions import ValidationError
from PIL import Image


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as img:
            if img.width > 70 or img.height > 70:
                raise ValidationError(
                    "The maximum allowed dimensions are 70x70"
                )


def validate_image_files_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = set(".jpg", ".jpeg", ".png", "gif")
    if ext.lower() not in valid_extensions:
        raise ValidationError("Unsupported file extension")
