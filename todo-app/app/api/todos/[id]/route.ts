import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }){
    const {id} = params;
    const {completed} = await request.json();
    const updated = await prisma.todo.update({where: {id}, data: {completed}});
    return NextResponse.json(updated);

}

export async function DELETE(request: Request, { params} : {params: {id: string}}){
    const {id} = params;
    const deleted = await prisma.todo.delete({where: {id}});
    return NextResponse.json({message: "Todo deleted successfully", deleted});
}
    