import { NextResponse } from 'next/server';

// Mock Shiprocket Integration
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, billing_customer_name, billing_address, pickup_location } = body;

    // Simulate authenticating and pushing order to Shiprocket
    // 1. Authenticate to get token
    // 2. Create order with Shiprocket API

    const mockResponse = {
      shipment_id: `ship_${Math.random().toString(36).substring(7)}`,
      order_id: orderId,
      status: 'NEW',
      courier_name: 'Delhivery',
      awb_code: `AWB${Math.floor(Math.random() * 100000000)}`,
      message: 'Order successfully pushed to Shiprocket (Mock)',
    };

    return NextResponse.json(mockResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create shipment' }, { status: 500 });
  }
}
