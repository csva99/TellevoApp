# Generated by Django 4.2.7 on 2023-11-22 00:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Tipousuario",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                (
                    "nombretipouser",
                    models.CharField(
                        max_length=50,
                        unique=True,
                        verbose_name="Nombre tipo de usuario",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Usuario",
            fields=[
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "email",
                    models.EmailField(
                        max_length=254, primary_key=True, serialize=False, unique=True
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                ("is_staff", models.BooleanField(default=False)),
                (
                    "tipouser",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="core.tipousuario",
                        verbose_name="Tipo de usuario",
                    ),
                ),
            ],
            options={"abstract": False,},
        ),
    ]