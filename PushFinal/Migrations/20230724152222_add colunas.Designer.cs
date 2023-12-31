﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PushFinal.Context;

#nullable disable

namespace PushFinal.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230724152222_add colunas")]
    partial class addcolunas
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.20")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("PushFinal.Models.Subscription", b =>
                {
                    b.Property<string>("P256DH")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Auth")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Endpoint")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("TempoExpiracao")
                        .HasColumnType("float");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("P256DH");

                    b.ToTable("Subscriptions");
                });
#pragma warning restore 612, 618
        }
    }
}
