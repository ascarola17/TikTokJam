# Generated by Django 5.0.6 on 2024-07-02 02:36

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("mytiktok", "0002_imageupload"),
    ]

    operations = [
        migrations.DeleteModel(
            name="ImageUpload",
        ),
    ]
